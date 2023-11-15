import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export interface SigninDto {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SigninRes {
  tokens: {
    access_token: string;
    refresh_token: string;
  };
  rememberMe?: boolean;
  userId: string;
}

export function useSignin(
  options?: UseMutationOptions<SigninRes, unknown, void, unknown>
) {
  return useTMutation<SigninDto, SigninRes>({
    url: '/login',
    service: 'auth',
    options,
  });
}
