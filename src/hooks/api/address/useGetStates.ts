import { useTQuery } from 'hooks/api/useTQuery';

export interface State {
  name: string;
  isoCode: string;
  countryCode: string;
  latitude: string;
  longitude: string;
}

export function useGetStates(country: string) {
  return useTQuery<State[]>({
    queryKey: ['states', country],
    url: `/countries/${country}/states`,
    service: 'organizations',
    options: {
      enabled: !!country,
      staleTime: Infinity,
      meta: { silent: true },
    },
  });
}
