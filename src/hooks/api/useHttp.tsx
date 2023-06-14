import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AppToast } from 'components/primary/AppToast';
import { useAppContext } from 'context/AppContext';
import { useDestroySession } from 'hooks/app/useDestroySession';
import { OutgoingHttpHeaders } from 'http2';
import { toast } from 'react-toastify';

export type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';

export type Service = 'auth';

export function urlModifier(url?: Service) {
  switch (url) {
    default:
      return '/v1/auth';
  }
}

export default function useHttp({
  config,
  headers,
}: {
  config?: AxiosRequestConfig<any>;
  headers?: OutgoingHttpHeaders;
}): AxiosInstance {
  const { state } = useAppContext();

  const { destroySession } = useDestroySession();

  const { tokens } = state;

  const axiosInstance = axios.create({
    headers: {
      Accept: 'application/json',
      Authorization: tokens?.accessToken ? `Bearer ${tokens.accessToken}` : '',
    },
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: process.env.WITH_CREDENTIALS === 'positive' ? true : false,
    timeout: 60 * 1000,
    ...config,
  });

  const serviceUnavailableMessage =
    'Service unavailable, please contact support';

  function terminateSession(message?: string) {
    destroySession();

    toast(<AppToast>{message ?? serviceUnavailableMessage}</AppToast>, {
      type: 'info',
    });

    return Promise.reject({
      response: { data: { message: 'service_unavailable' } },
    });
  }

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (e: any) {
      const data = e?.response?.data;

      const statusCode = data?.statusCode;

      if (isHtmlResponse(data)) return terminateSession();
      else if (statusCode === 401)
        return terminateSession(e?.response?.data?.message);

      return Promise.reject(e);
    }
  );

  const headersConfig: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-CHANNEL': 'BUSINESS_WEB',
    ...headers,
  };

  for (const key in headersConfig) {
    axiosInstance.defaults.headers.common[key] = headersConfig[key]!;
  }

  return axiosInstance;
}

export function isHtmlResponse(data: any) {
  if (typeof data !== 'string') return false;

  const chunk = data.substring(0, 20).toLowerCase();

  return chunk.includes('<!doctype html');
}
