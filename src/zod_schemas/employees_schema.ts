import { employeesFilterOptions } from 'constants/employees/filters';
import { z } from 'zod';
import { paginationAndRangeZodSchema } from 'zod_schemas/commons';

export const employeesFiltersSchema = z
  .object({
    status: z
      .object({
        title: z.string(),
        value: z.string().nullable(),
      })
      .catch(employeesFilterOptions[0]!),
    employeeId: z.string().catch(''),
  })
  .merge(paginationAndRangeZodSchema);
