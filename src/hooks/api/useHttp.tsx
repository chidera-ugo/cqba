import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { OutgoingHttpHeaders } from 'http2';

export type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';
export type Service = 'card' | 'aku' | 'transfer';

export function urlModifier(url?: Service) {
  function getSuffix() {
    switch (url) {
      default:
        return '/api/v1';
    }
  }

  return `${getSuffix()}`;
}

export default function useHttp({
  config,
  headers,
}: {
  config?: AxiosRequestConfig<any>;
  headers?: OutgoingHttpHeaders;
}): AxiosInstance {
  const axiosInstance = axios.create({
    headers: {
      Accept: 'application/json',
    },
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: process.env.WITH_CREDENTIALS === 'positive' ? true : false,
    timeout: 30 * 1000,
    ...config,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      const data = response.data;

      if (
        typeof data === 'string' &&
        (data.includes('doctype html') || data.includes('<!'))
      ) {
        throw new Error('Service unavailable, please contact support');
      }

      return response;
    },
    async function (e) {
      return Promise.reject(e);
    }
  );

  const headersConfig: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  for (const i in headersConfig) {
    axiosInstance.defaults.headers.common[i] = headersConfig[i]!;
  }

  return axiosInstance;
}
