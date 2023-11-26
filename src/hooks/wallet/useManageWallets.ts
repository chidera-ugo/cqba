import { IWallet, useGetAllWallets } from 'hooks/api/wallet/useGetAllWallets';

export const useManageWallets = () => {
  const { isLoading, isError, data } = useGetAllWallets();

  return {
    primaryWallet: data
      ?.map(({ balance, availableBalance, ...data }) => {
        return {
          ...data,
          balance: balance / 100,
          availableBalance: availableBalance / 100,
        };
      })
      .find(({ primary }) => primary) as IWallet,
    isLoading,
    isError,
  };
};
