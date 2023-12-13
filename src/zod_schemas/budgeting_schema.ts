import { z } from 'zod';
import { paginationAndRangeZodSchema } from 'zod_schemas/commons';

export const budgetingFiltersSchema = (defaultOptions: {
  title: string;
  value: string;
}) =>
  z
    .object({
      status: z
        .object({
          title: z.string(),
          value: z.string().nullable(),
        })
        .default(defaultOptions)
        .catch(defaultOptions),
    })
    .merge(paginationAndRangeZodSchema);
