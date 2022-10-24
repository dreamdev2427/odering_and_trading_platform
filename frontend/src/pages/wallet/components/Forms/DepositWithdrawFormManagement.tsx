import React, { ChangeEvent, useState } from 'react';
import { QueryInfo } from '@apollo/client/core/QueryInfo';

import {
  InvestorDepositWithdrawAlertInput,
  InvestorWalletDocument,
  PaymentChannelType,
  useGetMercuryAccountInfoQuery,
  useInvestorAppDataQuery,
  useInvestorDepositWithdrawAlertMutation,
  useVerifyTransactionFromBlockchainMutation,
  VerifyCryptoReciepeInput,
} from 'services/apollo/graphql';
import { InvestorInvoiceAlert, InvestorWalletChannel } from 'services/apollo/multisto';
import { useGqlErrorExtractor } from 'hooks';

import { useHistory } from 'react-router-dom';
import { BsSwal, Loading } from 'atoms';
import WithdrawFormBlockchain from './withdrawForms/WithdrawFormBlockchain';
import WithdrawFormBank from './withdrawForms/WithdrawFormBank';
import DepositFormVerifyTxBlockchain from './depositForms/DepositFormVerifyTxBlockchain';
import DepositFormSendTxBlockchain from './depositForms/DepositFormSendTxBlockchain';
import DepositFormBank from './depositForms/DepositFormBank';
import DepositFormMercury from './depositForms/DepositFormMercury';

interface DepositWithdrawFormManagementProps {
  channel: InvestorWalletChannel;
  stoID: number;
  isWithdraw: boolean;
  investorID: number;
  hideModal: () => void;
  doAutomaticBlockchainTransactionChecks?: boolean;
  invoice?: InvestorInvoiceAlert;
}

const fillBlock = (curID: number, channelID: number, stoID: number): VerifyCryptoReciepeInput => {
  return {
    stoID,
    transactionHash: '',
    details: '',
    currencyID: curID,
    amount: 0,
    channelID,
  };
};

const fillState = (channelID = 0, stoID = 0): InvestorDepositWithdrawAlertInput => {
  return {
    stoID,
    channelID: channelID ?? 0,
    amount: 0,
    details: '',
    bankName: '',
    swiftCode: '',
    bankAccount: '',
    transactionID: '',
    isWithdrawRequest: false,
  };
};

const DepositWithdrawFormManagement: React.FC<DepositWithdrawFormManagementProps> = ({
  channel,
  stoID,
  investorID,
  isWithdraw,
  hideModal,
  doAutomaticBlockchainTransactionChecks,
  invoice,
}) => {
  const isBlockchain = channel.currency?.isBlockchainBased ?? false;
  const [state, setState] = useState(fillState(channel.ID, stoID));
  const [form, setForm] = useState(fillBlock(channel.currencyID, channel.ID, stoID));
  const [error, setGqlError] = useGqlErrorExtractor(fillState(channel.ID, stoID));
  const [investorAlert] = useInvestorDepositWithdrawAlertMutation({
    refetchQueries: [{ query: InvestorWalletDocument, variables: { _id: stoID } }],
  });
  const [verifyBlockchain] = useVerifyTransactionFromBlockchainMutation({
    refetchQueries: [{ query: InvestorWalletDocument, variables: { _id: stoID } }],
  });
  const { data: appData, loading: appDataLoading } = useInvestorAppDataQuery();
  const { data: mercuryAccount, loading: load } = useGetMercuryAccountInfoQuery({ fetchPolicy: 'no-cache' });
  const history = useHistory();

  if ((load && !mercuryAccount) || appDataLoading || !appData) {
    return <Loading />;
  }
  const { doAutomaticPurchase, isInvoicingEnabled } = appData.investorAppParameters;
  const mercuryAccountInfo = mercuryAccount?.getMercuryAccountInfo;

  const onChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const newState = { [e.currentTarget.name]: e.currentTarget.value };
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  const onSubmit = (isWithdrawRequest = false, title: string) => {
    const data = {
      ...state,
      isWithdrawRequest,
      amount: Number(state.amount),
      buyAlertID: invoice?.buyAlertID,
    };
    investorAlert({ variables: { data } })
      .then(() => {
        hideModal();
        return BsSwal.fire({
          title,
          icon: 'success',
        });
      })
      .catch((err: QueryInfo) => {
        setGqlError(err);
      });
  };

  const onMetamaskSubmit = (isWithdrawRequest = false, title: string) => {
    const data = {
      stoID,
      channelID: channel.ID,
      isWithdrawRequest,
      amount: Number(invoice?.amountToPay),
      buyAlertID: invoice?.buyAlertID,
    };
    investorAlert({ variables: { data } })
      .then(() => {
        hideModal();
        return BsSwal.fire({
          title,
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            history.push(`/investor/Portfolio`);
          }
        });
      })
      .catch((err: QueryInfo) => {
        setGqlError(err);
      });
  };

  const onBlockChainChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.name === 'amount') {
      const newState = { [e.currentTarget.name]: Number(e.currentTarget.value) };
      setForm((prevState) => ({ ...prevState, ...newState }));
    } else {
      const newState = { [e.currentTarget.name]: e.currentTarget.value };
      setForm((prevState) => ({ ...prevState, ...newState }));
    }
  };

  const onBlockChainSubmit = () => {
    const data: VerifyCryptoReciepeInput = form;
    if (doAutomaticBlockchainTransactionChecks) {
      return verifyBlockchain({ variables: { data } })
        .then(() => {
          hideModal();
          return BsSwal.fire({
            title: 'Transaction is processed successfully. Funds are transferred in your internal wallet',
            icon: 'success',
          });
        })
        .catch((err) => {
          hideModal();
          return BsSwal.fire({
            title: (err as Error)?.message,
            icon: 'error',
          });
        });
    }
    const alertData: InvestorDepositWithdrawAlertInput = {
      stoID: form.stoID,
      channelID: form.channelID,
      amount: form.amount,
      details: form.details,
      isWithdrawRequest: false,
      transactionID: form.transactionHash,
    };
    return investorAlert({ variables: { data: alertData } })
      .then(() => {
        hideModal();
        return BsSwal.fire({
          title: 'Transaction is processed successfully. Funds are transferred in your internal wallet',
          icon: 'success',
        });
      })
      .catch((err) => {
        setGqlError(err);
        return BsSwal.fire({
          title: (err as Error)?.message,
          icon: 'error',
        });
      });
  };

  if (isWithdraw) {
    if (isBlockchain) {
      const title = `Your withdraw request has been sent to the administration. 
      They will verify the request and will update your balance. 
      An email will be sent if the funds transfer has been approved or not`;
      return (
        <WithdrawFormBlockchain
          hideModal={hideModal}
          channelDetails={channel.details ?? ''}
          investorID={investorID}
          state={state}
          error={error}
          onChange={onChange}
          onSubmit={() => onSubmit(true, title)}
        />
      );
    }
    const title = `Your withdraw request has been sent to the administration. 
      They will verify the request and will update your balance. 
      An email will be sent if the funds transfer has been approved or not`;
    return (
      <WithdrawFormBank
        hideModal={hideModal}
        channelDetails={channel.details ?? ''}
        investorID={investorID}
        state={state}
        error={error}
        onChange={onChange}
        onSubmit={() => onSubmit(true, title)}
      />
    );
  }

  if (isBlockchain && channel.channelType === PaymentChannelType.Metamask) {
    const title =
      isInvoicingEnabled && doAutomaticPurchase
        ? `Your Metamask payment was sent.
    Shares will be transfered shortly`
        : `Your Metamask payment request has been sent to the administration. 
  They will verify the request and will update your shares balance.`;
    return (
      <DepositFormSendTxBlockchain
        invoice={invoice as InvestorInvoiceAlert}
        channel={channel}
        hideModal={hideModal}
        onSubmit={() => onMetamaskSubmit(false, title)}
      />
    );
  }

  if (isBlockchain) {
    return (
      <DepositFormVerifyTxBlockchain
        hideModal={hideModal}
        channelDetails={channel.details ?? ''}
        investorID={investorID}
        state={form}
        error={error}
        onChange={onBlockChainChange}
        onSubmit={onBlockChainSubmit}
      />
    );
  }

  if (channel.channelType === PaymentChannelType.Mercury) {
    return (
      <DepositFormMercury
        hideModal={hideModal}
        mercuryAccount={mercuryAccountInfo ?? { accountNumber: '', routingNumber: '' }}
        investorID={investorID}
        stoID={stoID}
      />
    );
  }
  const title = `Your payment request has been sent to the administration. 
      They will verify the request and will update your shares balance. 
      An email will be sent if the funds transfer has been approved or not`;
  return (
    <DepositFormBank
      hideModal={hideModal}
      channelDetails={channel.details ?? ''}
      investorID={investorID}
      state={state}
      error={error}
      onChange={onChange}
      onSubmit={() => onSubmit(false, title)}
    />
  );
};

export default DepositWithdrawFormManagement;
