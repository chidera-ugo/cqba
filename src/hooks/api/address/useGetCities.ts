import { useTQuery } from 'hooks/api/useTQuery';

export interface City {
  name: string;
  stateCode: string;
  countryCode: string;
  latitude: string;
  longitude: string;
}

export function useGetCities(country: string, state: string) {
  return useTQuery<City[]>({
    queryKey: ['cities', country, state],
    url: `/countries/${country}/states/${state}/cities`,
    service: 'organizations',
    options: {
      enabled: !!country && !!state,
      staleTime: Infinity,
      meta: { silent: true },
    },
  });
}
