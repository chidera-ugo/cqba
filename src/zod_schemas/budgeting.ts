import { z } from 'zod';
import { paginationAndRangeZodSchema } from 'zod_schemas/commons';

export const budgetingFiltersSchema = z
  .object({
    status: z
      .object({
        title: z.string(),
        value: z.string().nullable(),
      })
      .catch({
        title: 'Active Budgets',
        value: 'active',
      }),
  })
  .merge(paginationAndRangeZodSchema);
