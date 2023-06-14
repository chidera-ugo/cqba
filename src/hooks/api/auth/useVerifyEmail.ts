import { UseQueryOptions } from '@tanstack/react-query';
import { useTQuery } from 'hooks/api/useTQuery';

export function useVerifyEmail(
  email: string,
  code: string,
  options?: UseQueryOptions<any, any, any, string[]>
) {
  return useTQuery({
    queryKey: ['verify-email', email, code],
    url: `/verify-email?email=${email}&code=${code}`,
    service: 'auth',
    options: {
      ...options,
      meta: { silent: true },
    },
  });
}
