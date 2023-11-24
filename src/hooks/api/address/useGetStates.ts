import { useTQuery } from 'hooks/api/useTQuery';
import { useAppContext } from 'context/AppContext';

export interface State {
  name: string;
  isoCode: string;
  countryCode: string;
  latitude: string;
  longitude: string;
}

export function useGetStates(country: string) {
  const { user } = useAppContext().state;

  return useTQuery<State[]>({
    queryKey: ['states', country],
    url: `/${user?.organization}/countries/${country}/states`,
    service: 'organizations',
    options: {
      enabled: !!user?.organization && !!country,
      staleTime: Infinity,
      meta: { silent: true },
    },
  });
}
