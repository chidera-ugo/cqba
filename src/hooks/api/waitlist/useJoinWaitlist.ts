import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export const useJoinWaitlist = (
  options?: UseMutationOptions<any, unknown, void, unknown>
) => {
  return useTMutation({
    url: `/pre-register`,
    options,
  });
};
