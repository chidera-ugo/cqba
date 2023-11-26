import { useTQuery } from 'hooks/api/useTQuery';

export interface IInstitution {
  id: string;
  type: string;
  bank: Bank;
}

interface Bank {
  nipCode: string;
  name: string;
  cbnCode: string;
}

export function useGetInstitutions() {
  return useTQuery<IInstitution[]>({
    queryKey: ['institutions'],
    url: `/banks`,
    service: 'budgets',
    options: {
      staleTime: Infinity,
      meta: {
        silent: true,
      },
    },
  });
}
