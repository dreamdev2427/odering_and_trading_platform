import { Rolessto, Users } from "../../../Schema";


export default interface IUsersService {
    /**
     * Get all users
     */
    getUsers(): Promise<Users[]>;
    /**
     * Get all Users by ids
     */
    getUsersById(userIds:number[]): Promise<Users[]>;
    /**
     * Get all users of an sto by username
     */
    getStoUsersByUsername(username:string[], stoId:number): Promise<Users[]>;
    /**
     * Set all given users to the new pasteStoId
     */
    copyUsersToSto(pasteStoId:number, usersToBeCopied:number[], usernames:string[]): Promise<void>;
}
