import axios from 'axios';
import { CurrentUserRes } from 'types/Auth';
import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
} from '@tanstack/react-query';

export const useGetCurrentUser = (
  token?: string,
  options?: UseQueryOptions<any, any, CurrentUserRes, string[]>
): UseQueryResult<CurrentUserRes, unknown> => {
  const axiosInstance = axios.create({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: process.env.WITH_CREDENTIALS === 'positive' ? true : false,
    timeout: 30 * 1000,
  });

  return useQuery({
    queryKey: ['current-user'],
    queryFn: () =>
      axiosInstance['get'](`/uaa/v1/user/details`).then((res) => res.data),
    ...options,
    staleTime: Infinity,
  });
};
