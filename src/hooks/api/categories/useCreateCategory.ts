import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useCreateCategory(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<{ title: string }, any>({
    url: '',
    service: 'category',
    options,
  });
}
