import { z } from 'zod';
import { paginationAndRangeZodSchema } from 'zod_schemas/commons';

export const walletFiltersSchema = z
  .object({
    transactionType: z.string().catch(''),
    budgetId: z.string().catch(''),
  })
  .merge(paginationAndRangeZodSchema);
