import axios from 'axios';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { Tokens } from 'context/AppContext/types';
import { deleteFromLocalStore } from 'lib/localStore';
import { handleAxiosError } from 'methods/http/handleAxiosError';
import { IUser } from 'types/Auth';

export function useGetCurrentUser(
  retrieveNewTokens: (tokens: Tokens) => void,
  token?: string,
  options?: UseMutationOptions<IUser, unknown, any, unknown>
): UseMutationResult<IUser, unknown, any, unknown> {
  const axiosInstance = axios.create({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: process.env.WITH_CREDENTIALS === 'positive',
    timeout: 30 * 1000,
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (e) => {
      const req = await handleAxiosError(e, retrieveNewTokens, () => {
        deleteFromLocalStore('tokens');
      });

      try {
        const res = await axiosInstance(req);

        if (!options?.onSuccess || !res.data) return;

        options?.onSuccess(res.data as IUser, undefined, undefined);
      } catch (e) {
        return;
      }
    }
  );

  return useMutation({
    mutationFn: (token) => {
      return axiosInstance['get'](`/v1/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res?.data);
    },
    ...options,
  });
}
