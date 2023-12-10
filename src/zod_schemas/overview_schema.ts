import {
  periodPresetOptions,
  transactionTypeFilterOptions,
} from 'constants/overview/filters';
import { z } from 'zod';
import { defaultFilterObjectSchema, rangeZodSchema } from 'zod_schemas/commons';

export const overviewFiltersSchema = z.object({
  transactionType: z
    .object(defaultFilterObjectSchema)
    .catch(transactionTypeFilterOptions[1]!),
  range: rangeZodSchema,
  rangePreset: z
    .object({ value: z.number(), name: z.string() })
    .catch(periodPresetOptions[2]!),
});
