import { Rolessto } from "../../../Schema";


export type RolePair = {
    copyRoleId: number | undefined | null;
    pasteRoleId: number | undefined | null;
}

export default interface IStoRolesService {
    /**
     * Get all stoRoles for a list of users
     */
    getStoRolesForUsers(userIds:number[]): Promise<any[]>;
    /**
     * Get all stoRoles in array of role names
     */
    getStoRolesByName(roles:any[], stoId:number): Promise<Rolessto[]>;
    /**
     * insert stoRoles
     */
    insertStoRoles(copyStoId:number, pasteStoId: number, roles:any[]): Promise<void>;
    /**
     * insert usersSto
     */
    insertUsersSto(usersSto: number[][]): Promise<null>;
    /**
     * insert UserRoles
     */
    insertUserRoles(usersSto: number[][]): Promise<null>;
    /**
     * insert role rights
     */
    insertRoleRights(roleIds: RolePair[]): Promise<null>;
}
