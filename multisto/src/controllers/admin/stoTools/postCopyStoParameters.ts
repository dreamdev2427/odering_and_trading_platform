import { Request, Response } from 'express';
import common from '../../../modules/common';
import IStoService from "../../../services/investorClient/affiliate/data/IStoService";
import StoSqlService from "../../../services/investorClient/affiliate/data/StoSqlService";
import IUsersService from "../../../services/platform/Users/IUsersService";
import UsersSqlService from "../../../services/platform/Users/UsersSqlService";
import IStoRolesService, { RolePair } from "../../../services/platform/StoRoles/IStoRolesService";
import StoRolesSqlService from "../../../services/platform/StoRoles/StoRolesSqlService";
import ILogService from "../../../services/investorClient/affiliate/data/ILogService";
import LogSqlService from "../../../services/investorClient/affiliate/data/LogSqlService";
import { Rolessto, Users } from "../../../Schema";
import logger from '../../../logger';

const fs = require('fs');
const path = require('path');

type MapResult = {
    UsersStoList: number[][],
    RolePairs: RolePair[]
}



async function transferParams(req: Request, res: Response): Promise<void> {
    const stoService: IStoService  = new StoSqlService();
    if (req.body.copySettingsStoId === req.body.pasteSettingsStoId) {
        common.handleError(req, res, `Both selected STOs are the same - Error occurred in copyStoSettings`);
    }
    const fieldsToBeCopied = JSON.parse(req.body.fieldsToBeCopied);

    if (fieldsToBeCopied.includes('logo')) {
        const copySto = await stoService.getSto(req.body.copySettingsStoId);
        try{
            const copyPath = path.join(__dirname, `../..//../../public/img/stologo/${copySto?.logo}`);
            const newFileName = `${new Date().toISOString().slice(0, 11).replace('T', '-')}${copySto?.logo}`;
            const pastePath = path.join(__dirname, `../..//../../public/img/stologo/${newFileName}`);


            const inStr = fs.createReadStream(common.getUserFileLocation(copyPath));
            const outStr = fs.createWriteStream(common.getUserFileLocation(pastePath));

            inStr.pipe(outStr);

            await stoService.updateLogoLink(req.body.pasteSettingsStoId, `${newFileName}`);
            const index = fieldsToBeCopied.indexOf('logo');
            if (index > -1) {
                fieldsToBeCopied.splice(index, 1);
            }
        } catch (e) {
            common.handleError(req, res, `${e} | error occurred while copying the sto logo`);
        }
    }

    if (fieldsToBeCopied.length > 0) {
        await stoService.copyStoParameters(req.body.copySettingsStoId, req.body.pasteSettingsStoId, fieldsToBeCopied)
            .catch((error) => {
                common.handleError(req, res, `${error.message} - Error occurred in copyStoSettings while copying sto params`);
            });
    }
}

async function insertUsers(req: Request, res: Response, userIds:any): Promise<Users[]> {
    const usersService: IUsersService = new UsersSqlService();
    // find usernames of those users
    const usernames = (await usersService.getUsersById(userIds)).map(item => item.Username);
    await usersService.copyUsersToSto(req.body.pasteSettingsStoId, userIds, usernames)
        .catch((error) => {
            common.handleError(req, res, `${error.message} - Error occurred in copyStoSettings while copying users`);
        });
    return await usersService.getStoUsersByUsername(usernames, req.body.pasteSettingsStoId);
}
async function insertRoles(req: Request, res: Response, userIds: any[], stoRolesService:IStoRolesService): Promise<any> {
    // find the original roles of those copied users
    const copyStoRoles = await stoRolesService.getStoRolesForUsers(userIds);
    // insert them into the paste sto
    const copyStoRolesName = copyStoRoles.map(item => item.Role)
    await stoRolesService.insertStoRoles(req.body.copySettingsStoId, req.body.pasteSettingsStoId, copyStoRolesName)
        .catch((error) => {
            common.handleError(req, res, `${error.message} - Error occurred in copyStoSettings while copying rolessto`);
        });
    return copyStoRoles;
}

async function mapUsersWithRolesAndRoleIdsBetweenEachOther(req: Request, res: Response, pasteUsers:Users[], copyStoRoles:any[], pasteStoRoles: Rolessto[])
        : Promise<MapResult> {
    // map the users with the roles
    const usersStoList: number[][] = [];
    const roleRights: RolePair[] = [];
    pasteUsers.forEach(user => {
        const foundCopyStoRole = copyStoRoles.find(csr => csr.Username === user.Username);
        const foundPasteStoRole = pasteStoRoles.find(psr => psr.Role === foundCopyStoRole?.Role);
        if (foundPasteStoRole && typeof user.stoid !== 'undefined' && user.stoid !== null) {
            const userSto: number[] = [
                foundPasteStoRole.ID,
                user.ID,
                user.stoid,
            ];
            if (!copyStoRoles.find(csr => csr.roleid === userSto[0] && csr.userid === userSto[1] && csr.stoid === userSto[2])) {
                const rolePair: RolePair = {
                    copyRoleId: foundCopyStoRole?.ID,
                    pasteRoleId: foundPasteStoRole.ID
                };
                roleRights.push(rolePair);
                usersStoList.push(userSto);
            }
        }
    });
    const result: MapResult = {UsersStoList: usersStoList, RolePairs: roleRights};
    return result;
}

async function insertUserRole(req: Request, res: Response, usersStoList:number[][], stoRolesService: IStoRolesService): Promise<void> {
    if (req.body.pasteSettingsStoId === 0) {
        usersStoList.forEach(item => {
            item.splice(-1); // remove stoid from the list
        });
        // insert the mapping into the userroles table
        await stoRolesService.insertUserRoles(usersStoList)
            .catch((error) => {
                common.handleError(req, res, `${error.message} - Error occurred in copyStoSettings while copying userroles`);
            });
    } else {
        // insert the mapping into userssto table
        await stoRolesService.insertUsersSto(usersStoList)
            .catch((error) => {
                common.handleError(req, res, `${error.message} - Error occurred in copyStoSettings while copying userssto`);
            });
    }
}

async function transferUsers(req: Request, res: Response): Promise<void> {
    const stoRolesService: IStoRolesService = new StoRolesSqlService();
    const userIds = JSON.parse(req.body.usersToBeCopied);
    if (userIds.length > 0) {
        const pasteUsers = await insertUsers(req, res, userIds);
        const copyStoRoles = await insertRoles(req, res, userIds, stoRolesService);
        // find the freshly inserted users and their roles
        const copyStoRolesRoleNames = copyStoRoles.map((item:any) => item.Role);
        const pasteStoRoles = await stoRolesService.getStoRolesByName(copyStoRolesRoleNames, req.body.pasteSettingsStoId);
        const mapResult = await mapUsersWithRolesAndRoleIdsBetweenEachOther(req, res, pasteUsers, copyStoRoles, pasteStoRoles);

        if (mapResult.UsersStoList.length > 0) {
            // insert role rights
            await stoRolesService.insertRoleRights(mapResult.RolePairs);
            await insertUserRole(req, res, mapResult.UsersStoList, stoRolesService);
            const logService: ILogService = new LogSqlService();
            mapResult.UsersStoList.forEach(async (user) => {
                await logService.logActivity(user[1], 'New System User Created', -1, 1, user[2]);
            });

        }
    }
}

export default async (req: Request, res: Response) => {
    await transferParams(req, res);
    await transferUsers(req, res);
    res.redirect("/platform/sto");
}
