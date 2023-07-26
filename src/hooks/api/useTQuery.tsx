import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import useHttp from 'hooks/api/useHttp';
import { urlModifier } from 'hooks/api/useHttp/methods';
import { Method, Service } from 'hooks/api/useHttp/types';

export type TQueryArgs<Res> = {
  queryKey: string[];
  url: string;
  options?: UseQueryOptions<any, any, Res, string[]>;
  service?: Service;
  enabled?: boolean;
  // Allowing method to be passed because there might be need to
  // use useQuery for a post request so the request is made on ComponentDidMount
  // and to utilize useQuery specific features like caching with queryKey
  method?: Method;
  requestBody?: any;
};

export function useTQuery<Res>({
  queryKey,
  enabled = true,
  url,
  options,
  service,
  method = 'get',
  requestBody,
}: TQueryArgs<Res>): UseQueryResult<Res, unknown> {
  const api = useHttp({});
  const modifier = urlModifier(service);

  return useQuery({
    queryKey,
    queryFn: () =>
      api[method](`${modifier}${url}`, requestBody).then((res) => res.data),
    enabled,
    ...options,
  });
}
