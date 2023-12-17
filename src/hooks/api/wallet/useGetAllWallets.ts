import { REFETCH_INTERVAL } from 'constants/api/refetch_interval';
import { useTQuery } from 'hooks/api/useTQuery';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';

export interface IWallet {
  _id: string;
  currency: string;
  balance: number;
  primary: boolean;
  virtualAccounts: VirtualAccount[];
}

export interface VirtualAccount {
  _id: string;
  accountNumber: string;
  name: string;
  bankCode: string;
  bankName: string;
}

export function useGetAllWallets() {
  const { isVerified } = useIsVerified();

  return useTQuery<IWallet[]>({
    queryKey: ['wallets'],
    url: ``,
    service: 'wallet',
    options: {
      staleTime: Infinity,
      refetchInterval: REFETCH_INTERVAL,
      enabled: isVerified,
      meta: {
        silent: true,
      },
    },
  });
}
