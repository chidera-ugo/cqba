import { useTQuery } from 'hooks/api/useTQuery';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';

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
  const { isVerified } = useIsVerified();

  return useTQuery<WalletBalances>({
    queryKey: ['wallet_balances'],
    url: `/balances`,
    service: 'wallet',
    options: {
      staleTime: Infinity,
      meta: {
        silent: true,
        enabled: isVerified,
      },
    },
  });
}
