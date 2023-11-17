import { useTQuery } from 'hooks/api/useTQuery';
import { useAppContext } from 'context/AppContext';

export interface Country {
  name: string;
  isoCode: string;
  phonecode: string;
  currency: string;
}

export function useGetCountries() {
  const { user } = useAppContext().state;

  return useTQuery<Country[]>({
    queryKey: ['countries'],
    url: `/${user?.organizationId}/countries`,
    service: 'organizations',
    options: {
      enabled: !!user?.organizationId,
      staleTime: Infinity,
      meta: { silent: true },
    },
  });
}
