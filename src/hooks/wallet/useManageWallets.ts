import { IWallet, useGetAllWallets } from 'hooks/api/wallet/useGetAllWallets';
import { formatAmount } from 'utils/formatters/formatAmount';

export const useManageWallets = () => {
  const { isLoading, isError, data } = useGetAllWallets();

  const primaryWallet = data
    ?.map(({ balance, ...data }) => {
      return {
        ...data,
        balance: balance / 100,
      };
    })
    .find(({ primary }) => primary) as IWallet;

  function getAmountWithCurrency(amount?: number) {
    if (!primaryWallet) return null;

    return `${primaryWallet?.currency}${formatAmount({
      value: (amount ?? primaryWallet?.balance * 100) / 100,
    })}`;
  }

  return {
    primaryWallet,
    isLoading,
    isError,
    getAmountWithCurrency,
  };
};
