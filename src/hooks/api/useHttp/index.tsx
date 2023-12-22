import axios, {
  AxiosInstance,
  AxiosProgressEvent,
  AxiosRequestConfig,
} from 'axios';
import { AppToast } from 'components/primary/AppToast';
import { useAppContext } from 'context/AppContext';
import { useDestroySession } from 'hooks/app/useDestroySession';
import { OutgoingHttpHeaders } from 'http2';
import { handleAxiosError } from 'methods/http/handleAxiosError';
import { toast } from 'react-toastify';

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export type OnUploadProgress = (event: AxiosProgressEvent) => void;

export default function useHttp({
  config,
  headers,
  onUploadProgress,
}: {
  config?: AxiosRequestConfig<any>;
  headers?: OutgoingHttpHeaders;
  onUploadProgress?: OnUploadProgress;
}): AxiosInstance {
  const { dispatch, state } = useAppContext();

  const { destroySession } = useDestroySession();

  const tokens = state.tokens;

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

  const authHeader = tokens?.accessToken
    ? { Authorization: `Bearer ${tokens.accessToken}` }
    : {};

  const axiosInstance = axios.create({
    headers: {
      Accept: 'application/json',
      ...authHeader,
      ...headers,
    },
    onUploadProgress,
    baseURL,
    withCredentials: process.env.WITH_CREDENTIALS === 'positive',
    timeout: 60 * 1000,
    ...config,
  });

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

      return axiosInstance(req);
    }
  );

  return axiosInstance;
}
