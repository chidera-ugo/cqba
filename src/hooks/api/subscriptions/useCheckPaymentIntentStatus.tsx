import { useTQuery } from 'hooks/api/useTQuery';

interface Res {
  _id: string;
  type: string;
  organization: string;
  status: 'pending' | 'completed' | 'failed';
  currency: string;
  reference: string;
  amount: number;
  amountReceived: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export function useCheckPaymentIntentStatus(intentId: string) {
  return useTQuery<Res>({
    queryKey: ['payment_status', intentId],
    url: `/intents/${intentId}`,
    service: 'billing',
    options: {
      refetchInterval: 10000,
      meta: {
        silent: true,
      },
    },
  });
}
