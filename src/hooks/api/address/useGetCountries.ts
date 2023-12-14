import { useTQuery } from 'hooks/api/useTQuery';

export interface Country {
  name: string;
  isoCode: string;
  phonecode: string;
  currency: string;
}

export function useGetCountries() {
  return useTQuery<Country[]>({
    queryKey: ['countries'],
    url: `/countries`,
    service: 'organizations',
    options: {
      staleTime: Infinity,
      meta: { silent: true },
    },
  });
}
