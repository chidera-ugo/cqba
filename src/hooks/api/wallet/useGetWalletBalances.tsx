import { useTQuery } from 'hooks/api/useTQuery';
import { useManageWallets } from 'hooks/wallet/useManageWallets';

export interface WalletBalances {
  wallet: Wallet[];
  budget: Budget[];
}

interface Wallet {
  balance: number;
  currency: string;
}

interface Budget {
  balance: number;
  currency: string;
}

export function useGetWalletBalances() {
  const { primaryWallet } = useManageWallets();

  return useTQuery<WalletBalances>({
    queryKey: ['wallet_balances'],
    url: `/balances`,
    service: 'wallet',
    options: {
      enabled: !!primaryWallet?._id,
      staleTime: Infinity,
      meta: {
        silent: true,
      },
    },
  });
}
