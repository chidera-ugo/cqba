import { defaultPageSize } from 'constants/commons';
import { z } from 'zod';

export const paginationAndRangeZodSchema = z.object({
  pagination: z
    .object({
      pageIndex: z.number(),
      pageSize: z.number(),
    })
    .catch({
      pageIndex: 0,
      pageSize: defaultPageSize,
    }),
  range: z
    .object({
      start: z.string(),
      end: z.string(),
    })
    .catch({
      start: '',
      end: '',
    }),
});
