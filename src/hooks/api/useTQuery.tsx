import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import useHttp, { Method } from 'hooks/api/useHttp';
import { useHandleError } from 'hooks/api/useHandleError';
import { Service, urlModifier } from './useHttp';

export type Args = {
  queryKey: string[];
  url: string;
  options?: UseQueryOptions<any, any, any, string[]>;
  service?: Service;
  enabled?: boolean;
  // Allowing method to be passed because there might be need to
  // use useQuery for a post request so the request is made on ComponentDidMount
  // and to utilize useQuery specific features like cache tracking with queryKey
  method?: Method;
  requestBody?: any;
};

export function useTQuery<T>({
  queryKey,
  enabled = true,
  url,
  options,
  service,
  method = 'get',
  requestBody,
}: Args): UseQueryResult<T, unknown> {
  const api = useHttp({});
  const { handleError } = useHandleError();
  const modifier = urlModifier(service);

  return useQuery(
    queryKey,
    () => api[method](`${modifier}${url}`, requestBody).then((res) => res.data),
    {
      enabled,
      onError(e) {
        handleError(e);
      },
      ...options,
    }
  );
}
