import mysql from "../../../modules/mysql";
import common from "../../../modules/common";
import { Register } from "../../../Schema";
import * as emailTextsController from "../../platform/emails/controllers/EmailTexts.controller";

export default async (
  registrationID: number,
  hostname: string,
  url: string,
  footer: string,
  stoID: number
): Promise<any> => {
  await emailTextsController.getEmailTexts(stoID);
  const [
    user,
  ] = (await mysql.executeSQLStatement(`Select * from register where ID = ?`, [
    registrationID,
  ])) as Register[];
  if (!user) throw new Error("registration not found");

  const stoEmails = emailTextsController.default.globalEmailTexts();
  if (!stoEmails) throw new Error(`Could not get sto email texts`);

  let txtEmail = emailTextsController.format(
    stoEmails.RegistrationEmailText.Line1 as string,
    {
      firstname: user.FirstName ?? "",
      lastname: user.LastName ?? "",
      link: `${url}/verificationcode`,
      code: user.secret ?? "",
    }
  );
  txtEmail += "<br /><br />";
  txtEmail += footer;

  return common.sendEmail(
    hostname,
    user.Email,
    stoEmails.RegistrationEmailText.Subject,
    txtEmail,
    []
  );
};
