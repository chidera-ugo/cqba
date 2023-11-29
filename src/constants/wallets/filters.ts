import { z } from 'zod';

export const walletTransactionsFiltersSchema = z.object({
  type: z.string().catch(''),
});
