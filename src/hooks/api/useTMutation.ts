import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { useHandleError } from 'hooks/api/useHandleError';
import { AxiosRequestConfig } from 'axios';
import useHttp, { OnUploadProgress } from 'hooks/api/useHttp';
import { urlModifier } from 'hooks/api/useHttp/methods';
import { Method, Service } from 'hooks/api/useHttp/types';
import { generateUrlParamsFromObject } from 'utils/generators/generateUrlParamsFromObject';

type Args<Res> = {
  url: string;
  options?: UseMutationOptions<Res, unknown, any, unknown>;
  service?: Service;
  method?: Method;
  pathParams?: string[];
  appendQueryParams?: boolean;
  config?: AxiosRequestConfig<any>;
  onUploadProgress?: OnUploadProgress;
};

export function useTMutation<Dto, Res>({
  url,
  options,
  service,
  method = 'post',
  pathParams,
  appendQueryParams = false,
  config,
  onUploadProgress,
}: Args<Res>): UseMutationResult<Res, unknown, Dto, unknown> {
  const api = useHttp({ config, onUploadProgress });

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