import { useTQuery } from 'hooks/api/useTQuery';

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
  return useTQuery<IWallet[]>({
    queryKey: ['wallets'],
    url: ``,
    service: 'wallet',
    options: {
      staleTime: Infinity,
      meta: {
        silent: true,
      },
    },
  });
}
