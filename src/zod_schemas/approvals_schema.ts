import { approvalsFilterOptions } from 'constants/approvals/filters';
import { paginationAndRangeZodSchema } from 'zod_schemas/commons';
import { z } from 'zod';

export const approvalsFiltersSchema = z
  .object({
    status: z
      .object({
        title: z.string(),
        value: z.string().nullable(),
      })
      .catch(approvalsFilterOptions()[0]!),
  })
  .merge(paginationAndRangeZodSchema);
