import axios from 'axios';

const rpc = async (
  method: string,
  params: any,
  userName: string,
  password: string,
  serverLink: string,
): Promise<any> => {
  const options = {
    auth: {
      username: userName,
      password: password,
    },
  };
  const data = {
    jsonrpc: '1.0',
    method,
    params,
  };

  const rpcResponse = await axios.post(serverLink, data, options);

  return rpcResponse.data.result;

  /*
        rpcResponse.then((re) => {
            const result = re.data.result;
            resolutionFunc(result);
        });
        rpcResponse.catch((e) => {
            logger.info("....................RPC Error Raven...........................")
            logger.info("Ravencoin error - in ravencoin rpc call")
            logger.info(e.toString());				
            rejectionFunc(e);
        });
        } catch (e) {
            logger.info("....................RPC Error Raven...........................")
            logger.info("Ravencoin error - in ravencoin rpc call")
            logger.info(e.toString());				
            rejectionFunc(e);
        }
    */
};

export const getRavenTransactionID = async (
  transactionID: string,
  userName: string,
  password: string,
  serverLink: string,
): Promise<any> => {
  return rpc('getrawtransaction', [transactionID], userName, password, serverLink);
};
