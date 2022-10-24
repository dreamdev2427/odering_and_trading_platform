import { execute } from "./services/gql-execute";

interface User {
  ID: number;
}

declare module "express-session" {
  interface SessionData {
    user: User;
    stoid: number;
    userType: string;
    _ip: string;
    _ua: string;
    JWTToken: string;
    /**
     * DO NOT USE THIS
     * IDK why but ts doesn't resolve session interface if remove this
     */
    gqlExecute: typeof execute;
  }
}
