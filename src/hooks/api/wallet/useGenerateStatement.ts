import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useGenerateStatement(
  options?: UseMutationOptions<null, unknown, void, unknown>
) {
  return useTMutation<{ from: string; to: string }, null>({
    url: `/statement`,
    service: 'wallet',
    options,
  });
}
