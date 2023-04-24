import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export const useSendMessage = (
  options?: UseMutationOptions<any, unknown, void, unknown>
) => {
  return useTMutation({
    url: '/contact-us',
    options,
  });
};
