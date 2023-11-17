import { useTQuery } from 'hooks/api/useTQuery';
import { useAppContext } from 'context/AppContext';

export interface City {
  name: string;
  stateCode: string;
  countryCode: string;
  latitude: string;
  longitude: string;
}

export function useGetCities(country: string) {
  const { user } = useAppContext().state;

  return useTQuery<City[]>({
    queryKey: ['cities', country],
    url: `/${user?.organizationId}/countries/${country}/cities`,
    service: 'organizations',
    options: {
      enabled: !!user?.organizationId && !!country,
      staleTime: Infinity,
      meta: { silent: true },
    },
  });
}
