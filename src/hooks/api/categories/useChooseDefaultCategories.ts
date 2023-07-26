import { UseMutationOptions } from '@tanstack/react-query';
import { useTMutation } from 'hooks/api/useTMutation';

export function useChooseDefaultCategories(
  options?: UseMutationOptions<any, unknown, void, unknown>
) {
  return useTMutation<Array<string>, null>({
    url: '/choose',
    service: 'category',
    options,
  });
}
