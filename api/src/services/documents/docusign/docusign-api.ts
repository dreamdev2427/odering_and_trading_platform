import docusign, { EnvelopesApi } from 'docusign-esign';
import { Params, Stos } from '../../../entities';
import { PARAM } from '../../../core/envs';
import { decryptAsync } from './helpers/cryptography';
import { DocusignDetails } from './DocusignService';

interface AuthenticationInfo {
  accessToken: string;
  apiAccountId: string;
  basePath: string;
}
// i'm not sure if this is the full definition of userInfo, but it's the only things that are being used
interface AccountInfo {
  isDefault: string;
  accountId: string;
  baseUri: string;
}
export const authenticate = async (): Promise<AuthenticationInfo> => {
  const jwtLifeSec = 10 * 60, // requested lifetime for the JWT is 10 min
    dsApi = new docusign.ApiClient();
  const oauthBasePath = await Params.getParamOrFail(PARAM.DOCUSIGN_OAUTH_BASE_PATH);
  dsApi.setOAuthBasePath(oauthBasePath.stringValue.replace('https://', '')); // it should be domain only.
  const rsaKey = await decryptAsync(
    (
      await Params.getParamOrFail(PARAM.DOCUSIGN_RSA_KEY)
    ).stringValue,
  );
  // had some trouble with retrieving the pem normally, so now it's stored without the learing/ending strings
  const pemRsaKey = `-----BEGIN RSA PRIVATE KEY-----
  ${rsaKey}
-----END RSA PRIVATE KEY-----`;
  const rsaBuff = Buffer.from(pemRsaKey, 'utf-8');
  const integratorKey = (await Params.getParamOrFail(PARAM.DOCUSIGN_INTEGRATION_KEY)).stringValue;
  const userID = (await Params.getParamOrFail(PARAM.DOCUSIGN_USER_ID)).stringValue;
  const SCOPES = ['signature', 'impersonation'];

  try {
    const results = await dsApi.requestJWTUserToken(
      integratorKey,
      userID,
      SCOPES,
      rsaBuff,
      jwtLifeSec,
    );
    const accessToken = results.body.access_token;

    // get user info
    const userInfoResults = await dsApi.getUserInfo(accessToken);

    // use the default account
    const userInfo = userInfoResults.accounts.find(
      (account: AccountInfo) => account.isDefault === 'true',
    );

    return {
      accessToken: results.body.access_token,
      apiAccountId: userInfo.accountId,
      basePath: `${userInfo.baseUri}/restapi`,
    };
  } catch (e: any) {
    throw new Error(`${JSON.stringify(e)} - error occurred in docusign-api.authenticate`);
  }
};

interface MakeEnvelopeArgs {
  templateId: string;
  emailSubject: string;
  signerEmail: string;
  signerName: string;
  signerClientId: number;
  fields: DocusignDetails[];
}
interface EnvelopeDefinition {
  emailSubject: string;
  templateId: string;
  templateRoles: [
    {
      email: string;
      name: string;
      roleName: string; // make sure this matches the one set on each template (usually 'signer')
      clientUserId: number;
      tabs: {
        textTabs: DocusignDetails[];
      };
    },
  ];
  status: string; // always 'sent'
}
export const makeEnvelope = (envelopeArgs: MakeEnvelopeArgs): EnvelopeDefinition => {
  return {
    emailSubject: envelopeArgs.emailSubject,
    templateId: envelopeArgs.templateId,
    templateRoles: [
      {
        email: envelopeArgs.signerEmail,
        name: envelopeArgs.signerName,
        roleName: 'signer',
        clientUserId: envelopeArgs.signerClientId, // user-configurable  do not remove   necessay otherwise no onpage siging
        tabs: {
          textTabs: envelopeArgs.fields,
        },
      },
    ],
    status: 'sent',
  };
};

export const getEnvelopeId = async (
  authInfo: AuthenticationInfo,
  envelopeDefinition: EnvelopeDefinition,
): Promise<{ envelopesApi: EnvelopesApi; envelopeId: string }> => {
  // 2. Create the envelope
  const dsApiClient = new docusign.ApiClient();
  dsApiClient.setBasePath(authInfo.basePath);
  dsApiClient.addDefaultHeader('Authorization', 'Bearer ' + authInfo.accessToken);
  const envelopesApi = new docusign.EnvelopesApi(dsApiClient),
    results = await envelopesApi.createEnvelope(authInfo.apiAccountId, {
      envelopeDefinition: envelopeDefinition,
    }),
    envelopeId = results.envelopeId;
  if (!envelopeId) {
    throw new Error('No EnvelopeID - error occurred in createRecipientView');
  }
  return { envelopesApi, envelopeId };
};

export const createRecipientView = async (
  authInfo: AuthenticationInfo,
  envelopeDefinition: EnvelopeDefinition,
  returnUrl: string,
  envelopesApi: EnvelopesApi,
  envelopeId: string,
): Promise<string> => {
  // 3. create the recipient view, the embedded signing
  const viewRequest = {
    returnUrl,
    authenticationMethod: 'none',
    email: envelopeDefinition.templateRoles[0].email,
    userName: envelopeDefinition.templateRoles[0].name,
    clientUserId: envelopeDefinition.templateRoles[0].clientUserId,
  };

  // 4. Call the CreateRecipientView API
  // Exceptions will be caught by the calling function
  const result = await envelopesApi.createRecipientView(authInfo.apiAccountId, envelopeId, {
    recipientViewRequest: viewRequest,
  });
  return result.url ?? '';
};

export const composeReturnUrl = async (
  preferredReturnURL: string | undefined,
  purchaseID: number,
  documentID: number,
  envelopeId: string,
): Promise<string> => {
  const sto0 = await Stos.findOneOrFail({ ID: 0 });
  const queryParameters = new URLSearchParams({
    sharepurchaseid: `${purchaseID}`,
    documentid: `${documentID}`,
    envelopeid: `${envelopeId}`,
  });
  let returnUrl: string;
  if (preferredReturnURL) {
    const url = new URL(preferredReturnURL);
    url.searchParams.append('sharepurchaseid', `${purchaseID}`);
    url.searchParams.append('documentid', `${documentID}`);
    url.searchParams.append('envelopeid', `${envelopeId}`);
    returnUrl = url.toString();
  } else {
    returnUrl = `${sto0.stolinkfull}/share-purchase-docu-sign-return?${queryParameters}`;
  }
  return returnUrl;
};

export const downloadDocument = async (
  { accessToken, apiAccountId, basePath }: AuthenticationInfo,
  envelopeID: string,
): Promise<string> => {
  const dsApiClient = new docusign.ApiClient();
  dsApiClient.setBasePath(basePath);
  dsApiClient.addDefaultHeader('Authorization', 'Bearer ' + accessToken);
  const envelopesApi = new docusign.EnvelopesApi(dsApiClient);
  try {
    const document = await envelopesApi.getDocument(apiAccountId, envelopeID, '1', {});
    return Buffer.from(document, 'binary').toString('base64');
  } catch (err: any) {
    if (!err.message.includes('Not Found')) console.log(err);
  }
  return '';
};
