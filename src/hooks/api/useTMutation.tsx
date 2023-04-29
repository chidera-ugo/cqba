import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import useHttp, { Service, Method, urlModifier } from 'hooks/api/useHttp';
import { useHandleError } from 'hooks/api/useHandleError';
import { AxiosRequestConfig } from 'axios';
import { generateUrlParamsFromObject } from 'utils/helpers/generators/generateUrlParamsFromObject';

type Args = {
  url: string;
  options?: UseMutationOptions<any, unknown, any, unknown>;
  service?: Service;
  method?: Method;
  pathParams?: string[];
  appendQueryParams?: boolean;
  config?: AxiosRequestConfig<any>;
};

export function useTMutation<T>({
  url,
  options,
  service,
  method = 'post',
  pathParams,
  appendQueryParams = false,
  config,
}: Args): UseMutationResult<any, unknown, T, unknown> {
  const api = useHttp({ config });
  const modifier = urlModifier(service);
  const { handleError } = useHandleError();

  return useMutation(
    async (requestBody) => {
      if (pathParams) {
        return api[method](
          `${modifier}${url}/${generateUrlParamsFromObject({
            data: requestBody,
            acceptedPathParams: pathParams,
          })}`
        ).then((res) => res.data);
      }

      if (appendQueryParams) {
        return api[method](
          `${modifier}${url}${generateUrlParamsFromObject({
            data: requestBody,
          })}`
        ).then((res) => res.data);
      }

      return api[method](`${modifier}${url}`, requestBody).then(
        (res) => res.data
      );
    },
    {
      onError(e) {
        handleError(e);
      },
      ...options,
    }
  );
}
