import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export interface SignupDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  businessName?: string;
  industry?: string;
  phone?: string;
  password?: string;
}

export const useSignup = (
  options?: UseMutationOptions<any, unknown, void, unknown>
) => {
  return useTMutation<SignupDto, any>({
    url: '/register',
    options,
  });
};
