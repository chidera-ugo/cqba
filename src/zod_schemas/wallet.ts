import { z } from 'zod';

export const customersFiltersSchema = z.object({
  accountType: z
    .object({
      name: z.string(),
      value: z.string().nullable(),
    })
    .catch({
      name: 'All',
      value: null,
    }),
  pagination: z
    .object({
      pageIndex: z.number(),
      pageSize: z.number(),
    })
    .catch({
      pageIndex: 0,
      pageSize: 10,
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
  kycLevel: z.string().catch(''),
  accountStatus: z.string().catch(''),
});

export const customerInformationFiltersSchema = z.object({
  transactionType: z.string().catch(''),
});
