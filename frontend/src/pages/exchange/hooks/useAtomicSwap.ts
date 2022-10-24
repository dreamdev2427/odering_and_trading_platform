import { useCallback } from 'react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { useTranslation } from 'react-i18next';
import atomicSwapContractAbi from 'abis/atomicSwapContractAbi.json';
import erc1404TokenAbi from 'abis/erc1404TokenAbi.json';
import { BsSwal } from 'atoms';
import { ExchangeOfferDetailOffer, ExchangeOfferDetailOrder } from 'services/apollo/exchange';
import {
  AtomicSwapStatus,
  ExchangeType,
  useUpdateOrderStatusMutation,
  useInvestorAppDataQuery,
  useMeQuery,
  useAcceptBlockchainSwapMutation,
  useIsInvestorWhiteListedQuery,
} from 'services/apollo';

const useAtomicSwap = (
  order: ExchangeOfferDetailOrder,
  offer: ExchangeOfferDetailOffer,
  walletAddress: string,
  setAtomicSwapCurrentStatus: (atomicSwapStatus: AtomicSwapStatus) => void,
  setIsApproveLoading: (isApproveLoading: boolean) => void,
  setIsSwapLoading: (isSwapLoading: boolean) => void,
): [() => boolean | undefined, (tokenAmount: number, tokenContractAddress: string) => void, () => void, () => void] => {
  const { t } = useTranslation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [acceptBlockchainSwap] = useAcceptBlockchainSwapMutation();
  const { data } = useInvestorAppDataQuery();
  const { data: investorData } = useMeQuery();
  const { data: whiteListingData } = useIsInvestorWhiteListedQuery({ variables: { walletAddress } });

  const isOrderCreator = investorData?.investorUser?.investor.ID === order.investorID;
  const swapcontractAddress = data?.investorAppParameters.atomicSwapContractAddress;

  const isInvestorWhiteListed = useCallback(() => {
    return whiteListingData?.isInvestorWhiteListed;
  }, [whiteListingData]);

  /*
    // The following method also works just fine by connecting to the Contract
    
    const isInvestorWhiteListed = () => {
      if (walletAddress !== '') {
        const web3 = new Web3(new Web3.providers.HttpProvider(web3Address || ''));
        web3.eth.net.isListening().then(() => {
          const contract = new web3.eth.Contract(
            erc1404TokenAbi as AbiItem[],
            order.shareType.ethereumContractAddress || '',
          );
          contract.methods
            .getKYCData(walletAddress)
            .call()
            .then((result: any) => {
              if (result['0'] == 0) {
                return false;
              }
              if (parseInt(result['0']) < Date.now() / 1000) {
                return true;
              } else {
                return false;
              }
            });
        });
      }
    };
  */

  const handleApproveTransfers = async (tokenAmount: number, tokenContractAddress: string) => {
    if (walletAddress !== '') {
      setIsApproveLoading(true);
      const web3 = new Web3(window.ethereum);
      await web3.eth.getTransactionCount(walletAddress, 'pending').then((tx) => {
        if (order.shareType.ethereumContractAddress && order.atomicSwapTokenAddressAcceptable) {
          const contract = new web3.eth.Contract(erc1404TokenAbi as AbiItem[], tokenContractAddress);

          const rawTransaction = {
            from: walletAddress,
            gasPrice: web3.utils.toHex(120 * 1e9),
            gasLimit: 93399 + 10000,
            to: tokenContractAddress,
            value: 0x0,
            data: contract.methods
              .approve(swapcontractAddress, web3.utils.toWei(tokenAmount.toString(), 'ether'))
              .encodeABI(),
            nonce: parseInt(web3.utils.toHex(tx), 16),
          };

          web3.eth
            .sendTransaction(rawTransaction)
            .then((receipt) => {
              const variables = {
                orderId: order.ID,
                atomicSwapCurrentStatus: isOrderCreator
                  ? AtomicSwapStatus.SellerCommitted
                  : AtomicSwapStatus.BuyerCommitted,
              };
              updateOrderStatus({ variables });
              setAtomicSwapCurrentStatus(variables.atomicSwapCurrentStatus);
              BsSwal.fire({
                title: t('tradingComponentsAtomicSwapApprovalSucceededTitle'),
                text: t('tradingComponentsAtomicSwapApprovalSucceededDescription'),
                icon: 'success',
                footer: `<a target="_blank" href="https://etherscan.io/tx/${receipt.transactionHash}">${t(
                  'tradingComponentsAtomicSwapApprovalSucceededLinkText',
                )}</a>`,
              });
              setIsApproveLoading(false);
            })
            .catch((e) => {
              if (e.code === 4001) {
                BsSwal.fire({
                  title: t('tradingComponentsAtomicSwapApprovalFailedTitle'),
                  text: t('tradingComponentsAtomicSwapApprovalFailedDescription'),
                  icon: 'error',
                });
              }
              setIsApproveLoading(false);
            });
        }
      });
    }
  };

  const handleOpenSwap = async () => {
    if (walletAddress !== '') {
      setIsSwapLoading(true);
      const web3 = new Web3(window.ethereum);
      await web3.eth.getTransactionCount(walletAddress, 'pending').then((tx) => {
        const contract = new web3.eth.Contract(atomicSwapContractAbi as AbiItem[], swapcontractAddress);
        if (offer && offer.atomicSwapSecret) {
          const _swapNumber = web3.utils.toHex(offer.atomicSwapSecret);
          const _executor = offer.atomicBuyerPublicKey;
          const _openingToken = order.shareType.ethereumContractAddress;
          const _tokensToOpen = web3.utils.toHex(web3.utils.toWei(offer.sharesPartial.toString(), 'ether'));
          const _closingToken = order.atomicSwapTokenAddressAcceptable;
          const _tokensToClose = web3.utils.toHex(web3.utils.toWei(offer.rateFrom.toString(), 'ether'));
          const _expiry = web3.utils.toHex(Math.floor(Date.now() / 1000) + 259200);

          const rawTransaction = {
            from: walletAddress,
            gasPrice: web3.utils.toHex(120 * 1e9),
            gasLimit: 93399 + 150000,
            to: swapcontractAddress,
            value: 0x0,
            data: contract.methods
              .open(_swapNumber, _executor, _openingToken, _tokensToOpen, _closingToken, _tokensToClose, _expiry)
              .encodeABI(),
            nonce: parseInt(web3.utils.toHex(tx), 16),
          };

          web3.eth
            .sendTransaction(rawTransaction)
            .then((receipt) => {
              acceptBlockchainSwap({
                variables: { orderID: order.ID, walletAddress },
              });
              if (order.type === ExchangeType.Sell) {
                setAtomicSwapCurrentStatus(AtomicSwapStatus.SellerSent);
              }
              if (order.type === ExchangeType.Buy) {
                setAtomicSwapCurrentStatus(AtomicSwapStatus.BuyerCompleted);
              }
              BsSwal.fire({
                title: t('tradingComponentsAtomicSwapOpenSucceededTitle'),
                text: t('tradingComponentsAtomicSwapOpenSucceededDescription'),
                icon: 'success',
                footer: `<a target="_blank" href="https://etherscan.io/tx/${receipt.transactionHash}">${t(
                  'tradingComponentsAtomicSwapOpenSucceededLinkText',
                )}</a>`,
              });
              setIsSwapLoading(false);
            })
            .catch((e) => {
              if (e.code === 4001) {
                BsSwal.fire({
                  title: t('tradingComponentsAtomicSwapOpenFailedTitle'),
                  text: t('tradingComponentsAtomicSwapOpenFailedDescription'),
                  icon: 'error',
                });
              }
              setIsSwapLoading(false);
            });
        }
      });
    }
  };

  const handleCloseSwap = async () => {
    if (walletAddress !== '') {
      setIsSwapLoading(true);
      const web3 = new Web3(window.ethereum);
      await web3.eth.getTransactionCount(walletAddress, 'pending').then((tx) => {
        if (offer && offer.atomicBuyerPublicKey && offer.atomicSwapSecret && order.atomicSwapSharesWallet) {
          const contract = new web3.eth.Contract(atomicSwapContractAbi as AbiItem[], swapcontractAddress);
          const _originator = order.atomicSwapSharesWallet.publicKey;
          const _swapNumber = web3.utils.toHex(offer.atomicSwapSecret);

          const rawTransaction = {
            from: walletAddress,
            gasPrice: web3.utils.toHex(120 * 1e9),
            gasLimit: 93399 + 150000,
            to: swapcontractAddress,
            value: 0x0,
            data: contract.methods.close(_originator, _swapNumber).encodeABI(),
            nonce: parseInt(web3.utils.toHex(tx), 16),
          };
          web3.eth
            .sendTransaction(rawTransaction)
            .then((receipt) => {
              acceptBlockchainSwap({
                variables: { orderID: order.ID, walletAddress },
              });
              if (order.type === ExchangeType.Sell) {
                setAtomicSwapCurrentStatus(AtomicSwapStatus.BuyerCompleted);
              }
              if (order.type === ExchangeType.Buy) {
                setAtomicSwapCurrentStatus(AtomicSwapStatus.SellerSent);
              }
              BsSwal.fire({
                title: t('tradingComponentsAtomicSwapCloseSucceededTitle'),
                text: t('tradingComponentsAtomicSwapCloseSucceededDescription'),
                icon: 'success',
                footer: `<a target="_blank" href="https://etherscan.io/tx/${receipt.transactionHash}">${t(
                  'tradingComponentsAtomicSwapCloseSucceededLinkText',
                )}</a>`,
              });
              setIsSwapLoading(false);
            })
            .catch((e) => {
              if (e.code === 4001) {
                BsSwal.fire({
                  title: t('tradingComponentsAtomicSwapCloseFailedTitle'),
                  text: t('tradingComponentsAtomicSwapCloseFailedDescription'),
                  icon: 'error',
                });
              }
              setIsSwapLoading(false);
            });
        }
      });
    }
  };

  return [isInvestorWhiteListed, handleApproveTransfers, handleOpenSwap, handleCloseSwap];
};

export default useAtomicSwap;
