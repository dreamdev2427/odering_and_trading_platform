import { AutoCryptoPaymentReceiptProcessing, Currency, Params, PaymentChannels } from 'entities';
import { PARAM } from 'core/envs';
import web3 from 'web3';
import { executeTransaction } from 'core/mysql';
import increaseInvestorBalance from 'services/wallet/increaseInvestorBalance';
import { User } from 'core/context';
import { ValidationError } from 'apollo-server-core';
import { CRYPTO_CURRENCIES } from '../../api/crypto/verifer.types';
import { getRavenTransactionID } from './ravencoin';

const verifyTransactionReciepe = async (
  user: User,
  transactionHash: string,
  details: string,
  currencyID: number,
  amount: number,
  channelID: number,
  onlyCheckTransaction: boolean,
  stoID: number,
): Promise<any> => {
  // get if there is any successful record from AutoCryptoPaymentReceiptProcessing
  // if yes then just get out with error

  const tmpRecord = await AutoCryptoPaymentReceiptProcessing.findOne({
    transactionHash: transactionHash,
    isProcessedSuccessfully: 1,
  });
  if (tmpRecord != null) {
    throw new ValidationError(
      'This transaction ID has already been used and funds transferred in account. Cannot process transaction which is already been processed successfully ',
    );
  }

  const tmpChannelRec = await PaymentChannels.findOne({
    ID: channelID,
  });
  if (tmpChannelRec == null) {
    throw new ValidationError('Payment Channel does not exist');
  }

  // get crytocoin record
  const cryptoCoinRecord = await Currency.findOne({
    ID: currencyID,
  });
  if (cryptoCoinRecord == null) {
    throw new ValidationError('Crypto Transaction. No Currency with given ID');
  }

  const dateFormatted = new Date().toISOString().slice(0, 10);

  let cryptoAmountReceived = 0;

  if (
    cryptoCoinRecord?.blockchainID == CRYPTO_CURRENCIES.WEB3 ||
    cryptoCoinRecord?.blockchainID == CRYPTO_CURRENCIES.BINANCE ||
    cryptoCoinRecord?.blockchainID == CRYPTO_CURRENCIES.POLYGON
  ) {
    let blockchainLink = '';
    if (cryptoCoinRecord?.blockchainID == CRYPTO_CURRENCIES.WEB3)
      blockchainLink = (await Params.findOneOrFail({ param: PARAM.WEB3_ADDRESS })).stringValue;
    if (cryptoCoinRecord?.blockchainID == CRYPTO_CURRENCIES.BINANCE)
      blockchainLink = (await Params.findOneOrFail({ param: PARAM.BINANCE_WEB3_ADDRESS }))
        .stringValue;
    if (cryptoCoinRecord?.blockchainID == CRYPTO_CURRENCIES.POLYGON)
      blockchainLink = (await Params.findOneOrFail({ param: PARAM.POLYGON_WEB3_ADDRESS }))
        .stringValue;

    if (blockchainLink == '' || blockchainLink == null) {
      throw new ValidationError('Crypto Transaction. Blockchain doesnt exsist');
    }

    // Get transaction
    const Web3 = new web3(new web3.providers.HttpProvider(blockchainLink));
    let data = null;
    try {
      data = await Web3.eth.getTransaction(transactionHash);
    } catch (e2: any) {
      throw new ValidationError(
        'Error while processing this transaction. Either transaction ID is not correct or it does not exist in the blockchain. Please check transaction ID is 64 character long, has 0x in the beginning and is a valid approved transaction in blockchain',
      );
    }

    let allChecksValid = 1;
    let failedChecksReason = '';

    if (cryptoCoinRecord?.isNative == 1) {
      //If native currency

      //Check amount is exact as in the parameter
      cryptoAmountReceived = parseFloat(Web3.utils.fromWei(data.value.toString(), 'ether'));

      if (cryptoAmountReceived != amount) {
        allChecksValid = 0;
        failedChecksReason =
          failedChecksReason +
          'Incorrect amount provided. Please check transaction again and provide the exact amount transferred';
      }

      if (
        cryptoCoinRecord?.cryptoReceivingAddress.trim().toLowerCase() !=
        data.to?.trim().toLowerCase()
      ) {
        allChecksValid = 0;
        failedChecksReason =
          failedChecksReason +
          '. The amount was not sent to the correct company blockchain address';
      }

      if (allChecksValid == 0) {
        await AutoCryptoPaymentReceiptProcessing.insert({
          transactionHash: transactionHash,
          isProcessedSuccessfully: 0,
          investorID: user.ID,
          details: details,
          amountReceived: amount,
          cryptoCoinID: currencyID,
          stoID: user.stoID,
          failureReason: failedChecksReason,
          dateReceived: dateFormatted,
        });

        throw new ValidationError(failedChecksReason);
      }
    } else {
      // if ERC20 token then

      const decodeData = Web3.eth.abi.decodeParameters(
        [
          { type: 'address', name: 'address' },
          { type: 'uint256', name: 'amount' },
        ],

        data.input.substring(10),
      );

      cryptoAmountReceived = decodeData.amountConverted = parseFloat(decodeData.amount);
      if (cryptoAmountReceived != amount) {
        allChecksValid = 0;
        failedChecksReason =
          'Incorrect amount provided. Please check transaction again and provide the exact amount transferred';
      }

      if (cryptoCoinRecord?.Address.trim().toLowerCase() != data.to?.trim().toLowerCase()) {
        allChecksValid = 0;
        failedChecksReason =
          failedChecksReason + '. The transaction does not relate to correct crypto token ';
      }

      if (
        cryptoCoinRecord?.cryptoReceivingAddress.trim().toLowerCase() !=
        decodeData.address.trim().toLowerCase()
      ) {
        allChecksValid = 0;
        failedChecksReason =
          failedChecksReason +
          '. The amount was not sent to the correct company blockchain address';
      }

      if (allChecksValid == 0) {
        await AutoCryptoPaymentReceiptProcessing.insert({
          transactionHash: transactionHash,
          isProcessedSuccessfully: 0,
          investorID: user.ID,
          details: details,
          amountReceived: amount,
          cryptoCoinID: currencyID,
          stoID: user.stoID,
          failureReason: failedChecksReason,
          dateReceived: dateFormatted,
        });

        throw new ValidationError(failedChecksReason);
      }
    }
  } else if (cryptoCoinRecord?.blockchainID == CRYPTO_CURRENCIES.Ravencoin) {
    /*'4', 'Bitcoin'
            '5', 'Ravencoin'
          */
    const Ravencoin_ServerURL = (await Params.findOneOrFail({ param: PARAM.RAVENCOIN_SERVERURL }))
      .stringValue;
    const Ravencoin_Username = (await Params.findOneOrFail({ param: PARAM.RAVENCOIN_USERNAME }))
      .stringValue;
    const Ravencoin_Password = (await Params.findOneOrFail({ param: PARAM.RAVENCOIN_PASSWORD }))
      .stringValue;

    let dataTemp = null;
    try {
      dataTemp = await getRavenTransactionID(
        transactionHash,
        Ravencoin_Username,
        Ravencoin_Password,
        Ravencoin_ServerURL,
      );
    } catch (e: any) {
      throw new ValidationError('Not a valid transaction ID');
    }

    const RavencoinZMQDecoder = require('ravencoin-zmq-decoder');
    const ravencoinZmqDecoder = new RavencoinZMQDecoder('testnet');

    const decoded = ravencoinZmqDecoder.decodeTransaction(dataTemp);

    let isTransactionValid = 0;

    decoded.outputs.forEach((obj: any) => {
      if (parseFloat(obj.value) == amount) {
        obj.scriptPubKey.addresses.forEach((obj2: any) => {
          if (obj2 == cryptoCoinRecord.cryptoReceivingAddress) {
            cryptoAmountReceived = parseFloat(obj.value);
            isTransactionValid = 1;
          }
        });
      }
    });

    if (isTransactionValid == 0) {
      await AutoCryptoPaymentReceiptProcessing.insert({
        transactionHash: transactionHash,
        isProcessedSuccessfully: 0,
        investorID: user.ID,
        details: details,
        amountReceived: amount,
        cryptoCoinID: currencyID,
        stoID: user.stoID,
        failureReason:
          'Correct amount is not provided or crypto amount was not send to correct company blockchain address',
        dateReceived: dateFormatted,
      });

      throw new ValidationError(
        'Correct amount is not provided or crypto amount was not send to correct company blockchain address. Please check your transaction details again',
      );
    }
  }

  if (onlyCheckTransaction) {
    let convertedCurrency: number = currencyID;
    let converedAmount: number = cryptoAmountReceived;
    if (tmpChannelRec.conversionEnabled == 1) {
      convertedCurrency = tmpChannelRec.currencyToConvert;
      converedAmount = converedAmount * parseFloat(tmpChannelRec.conversionRate);
    }

    await executeTransaction(async (connection) => {
      await increaseInvestorBalance(
        user.ID,
        convertedCurrency,
        converedAmount,
        1,
        connection,
        stoID,
      );

      //create a record AutoCryptoPaymentReceiptProcessing
      await AutoCryptoPaymentReceiptProcessing.insert({
        transactionHash: transactionHash,
        isProcessedSuccessfully: 1,
        investorID: user.ID,
        details: details,
        amountReceived: cryptoAmountReceived,
        cryptoCoinID: currencyID,
        stoID,
        failureReason: '',
        dateReceived: dateFormatted,
      });
    });
  }

  return true;
};

export default verifyTransactionReciepe;
