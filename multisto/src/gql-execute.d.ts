import { execute } from "./services/gql-execute";

declare global {
  namespace Express {
    // Inject additional properties on express.Request
    interface Request {
      /**
       * This is a method to call the api as admin or platform admin
       * because their JWT stores in session.
       * To call the api as API role, use execute directly.
       */
      gqlExecute: typeof execute;
    }
  }
}
