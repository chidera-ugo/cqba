import { PaginationState } from '@tanstack/react-table';
import { defaultPageSize } from 'constants/commons';
import {
  defaultStringifySearch,
  simpleParseSearch,
} from 'hooks/client_api/search_params';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getDateRange } from 'utils/getters/getDateRange';
import { getDeepNestedObjectValue } from 'utils/getters/getDeepNestedObjectValue';
import { getKeysFromZodSchema } from 'utils/getters/getKeysFromZodSchema';
import { ZodObject, ZodRawShape } from 'zod';

export const useUrlManagedState = <T extends ZodRawShape>(
  schema: ZodObject<T>,
  defaultRangeInDays?: number,
  defaultRangeAccessorKey?: string, // You can pass the location of a range value present in "filters" as an accessorKey
  pageSize?: number
) => {
  const { isVerified } = useIsVerified();

  const searchParams = useSearchParams();

  const _pageSize = pageSize ?? defaultPageSize;

  const schemaKeys = getKeysFromZodSchema(schema);

  function validateSearchParams() {
    const data: Record<string, any> = {};

    for (const i of schemaKeys) {
      data[i] = simpleParseSearch(searchParams.get(i) ?? '');
    }

    return schema.parse(data);
  }

  const [filters, setFilters] = useState<Record<string, any>>({});

  const [range, setRange] = useState(
    getDateRange({ days: defaultRangeInDays ?? 0 })
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: _pageSize,
  } as PaginationState);

  const { replace } = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    if (!isVerified) return;

    const { pagination, ...search } = validateSearchParams();

    setFilters(search);
    getPaginationFromUrl(pagination);

    if (defaultRangeAccessorKey) {
      const rangeInDays = getDeepNestedObjectValue(
        search,
        defaultRangeAccessorKey
      );

      if (rangeInDays) {
        setRange(
          getDateRange({
            days: rangeInDays,
          })
        );

        return;
      }
    }

    if (!search?.range) return;

    const { start, end } = search?.range;

    if (!start || !end) return;

    setRange(
      getDateRange({
        startDate: start,
        endDate: end,
      })
    );
  }, []);

  useEffect(() => {
    if (!isVerified) return;

    replace(`${pathname}${defaultStringifySearch({ ...filters, pagination })}`);
  }, [filters, pagination]);

  function resetPagination() {
    setPagination({
      pageIndex: 0,
      pageSize: _pageSize,
    });
  }

  function getPaginationFromUrl(pagination: any) {
    if (!pagination) return resetPagination();

    const pageIndex = parseInt(pagination?.pageIndex);
    const pageSize = parseInt(pagination?.pageSize);

    if (isNaN(pageIndex) || isNaN(pageSize) || pageSize !== _pageSize)
      return resetPagination();

    setPagination({ pageIndex, pageSize });
  }

  return { filters, setFilters, range, setRange, pagination, setPagination };
};

export type UseUrlManagedState = ReturnType<typeof useUrlManagedState>;

export type TPagination = {
  pagination: UseUrlManagedState['pagination'];
  setPagination: UseUrlManagedState['setPagination'];
};
