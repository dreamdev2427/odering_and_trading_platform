import fs from "fs-extra";
import common from "../../../../modules/common";
import { Documentuser } from "../../../../Schema";

export const deleteSignature = (filepath: string) =>
    fs.unlink(common.getUserFileUploadsLocationFullPath(filepath));

// export const getSignaturePath = (
//     documentUserID: number,
//     investorID: number,
//     stoID: number
// ): Promise<string> => {
//     const sql = `select signaturefilepath from documentuser where id=? and investorid=? and stoid=?`;
//     return mysql
//         .executeSQLStatement<Documentuser>(sql, [
//             documentUserID,
//             investorID,
//             stoID,
//         ])
//         .then(head)
//         .then((result) => result.signaturefilepath || "");
// };
export const uploadSignature = (path: string, base64Data: string) =>
    fs.writeFile(
        common.getUserFileUploadsLocationFullPath(path),
        base64Data,
        "base64"
    );
export const getSingature = (
    documentUser?: Documentuser
): Promise<string | undefined> =>
    new Promise<string | undefined>((resolve) => {
        fs.readFile(
            common.getUserFileUploadsLocationFullPath(
                documentUser && documentUser.signaturefilepath
            ),
            "base64",
            (err, contents) => resolve(contents)
        );
    });
