import { useTQuery } from 'hooks/api/useTQuery';
import { useAppContext } from 'context/AppContext';

export interface City {
  name: string;
  stateCode: string;
  countryCode: string;
  latitude: string;
  longitude: string;
}

export function useGetCities(country: string, state: string) {
  const { user } = useAppContext().state;

  return useTQuery<City[]>({
    queryKey: ['cities', country, state],
    url: `/${user?.organizationId}/countries/${country}/states/${state}/cities`,
    service: 'organizations',
    options: {
      enabled: !!user?.organizationId && !!country && !!state,
      staleTime: Infinity,
      meta: { silent: true },
    },
  });
}
