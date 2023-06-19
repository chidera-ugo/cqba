import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AppToast } from 'components/primary/AppToast';
import { useAppContext } from 'context/AppContext';
import { useDestroySession } from 'hooks/app/useDestroySession';
import { OutgoingHttpHeaders } from 'http2';
import { handleAxiosError } from 'methods/http/handleAxiosError';
import { toast } from 'react-toastify';

export type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';
export type Service = 'auth' | 'organizations' | 'transactions' | 'employees';

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export function urlModifier(url?: Service) {
  switch (url) {
    case 'employees':
      return '/v1/employee';
    case 'organizations':
      return '/v1/organizations';
    case 'transactions':
      return '/v1/transactions';
    case 'auth':
      return '/v1/auth';
    default:
      return '/';
  }
}

export default function useHttp({
  config,
  headers,
}: {
  config?: AxiosRequestConfig<any>;
  headers?: OutgoingHttpHeaders;
}): AxiosInstance {
  const { state, dispatch } = useAppContext();
  const { destroySession } = useDestroySession();

  const { tokens } = state;

  const axiosInstance = axios.create({
    headers: {
      Accept: 'application/json',
      Authorization: tokens?.accessToken ? `Bearer ${tokens.accessToken}` : '',
    },
    baseURL,
    withCredentials: process.env.WITH_CREDENTIALS === 'positive',
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
    (response) => response,
    async (e) => {
      const req = await handleAxiosError(
        e,
        (tokens) => {
          dispatch({ type: 'saveTokens', payload: tokens });
        },
        terminateSession
      );

      return await axiosInstance(req);
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
