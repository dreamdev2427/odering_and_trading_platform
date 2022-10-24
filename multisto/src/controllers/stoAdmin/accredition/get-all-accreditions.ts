import { accreditionStatus } from "../../../graphql/enums";
import {
  investingEntity$$,
  mutation$,
  query$,
} from "../../../graphql/fetchers";
import logger from "../../../logger";

export const getAccreditionsWithWaitingStatus = async (req: any) => {
  try {
    const GET_ACCREDITATION =
      query$.getAllUnConfirmedEntitiesforStoAdmin(investingEntity$$);
    const result = await req.gqlExecute(GET_ACCREDITATION);
    return result?.getAllUnConfirmedEntitiesforStoAdmin;
  } catch (e) {
    logger.error(
      `${JSON.stringify(
        e
      )} - Error occurred in get-all-accreditations-waiting-status`
    );
    return [];
  }
};

export const getCountOfAccreditionsWithWaitingStatus = async (req: any) => {
  try {
    const GET_ACCREDITATION =
      query$.getAllUnConfirmedEntitiesforStoAdmin(investingEntity$$);
    const result = await req.gqlExecute(GET_ACCREDITATION);
    return result?.getAllUnConfirmedEntitiesforStoAdmin
      ? result?.getAllUnConfirmedEntitiesforStoAdmin.length
      : 0;
  } catch (e) {
    logger.error(
      `${JSON.stringify(
        e
      )} - Error occurred in getCountOfAccreditionsWithWaitingStatus`
    );
    return 0;
  }
};
const ACCREDITATION_MUTATION =
  mutation$.setStatusOfAccreditationOnStoAdmin(investingEntity$$);

export const setAccreditationStatus = async (req: any, res: any) => {
  const entityID = +req.body.id;
  const status: accreditionStatus =
    +req.body.status === 1 ? "APPROVED" : "DECLINED";
  try {
    await req.gqlExecute(ACCREDITATION_MUTATION, {
      variables: {
        entityID,
        status,
      },
    });
    res.redirect("dashboardsto");
  } catch (e) {
    logger.error(`Error in setAccreditationStatus - ${JSON.stringify(e)}`);
    res.redirect("dashboardsto");
  }
};
