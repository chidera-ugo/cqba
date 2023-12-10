import { defaultPageSize } from 'constants/commons';
import { z } from 'zod';

export const paginationZodSchema = z
  .object({
    pageIndex: z.number(),
    pageSize: z.number(),
  })
  .catch({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });

export const rangeZodSchema = z
  .object({
    start: z.string(),
    end: z.string(),
  })
  .catch({
    start: '',
    end: '',
  });

export const defaultFilterObjectSchema = {
  value: z.string(),
  name: z.string(),
};

export const paginationAndRangeZodSchema = z.object({
  pagination: paginationZodSchema,
  range: rangeZodSchema,
});
