import { useTQuery } from 'hooks/api/useTQuery';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';

export interface IWallet {
  _id: string;
  currency: string;
  balance: number;
  primary: boolean;
  virtualAccounts: VirtualAccount[];
  availableBalance: number;
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
      meta: {
        silent: true,
        enabled: isVerified,
      },
    },
  });
}