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
    url: `/${user?.organization}/countries/${country}/states/${state}/cities`,
    service: 'organizations',
    options: {
      enabled: !!user?.organization && !!country && !!state,
      staleTime: Infinity,
      meta: { silent: true },
    },
  });
}
