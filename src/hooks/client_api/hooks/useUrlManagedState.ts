import { PaginationState } from '@tanstack/react-table';
import { defaultPageSize } from 'constants/commons';
import {
  defaultStringifySearch,
  simpleParseSearch,
} from 'hooks/client_api/search_params';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
} from 'next/navigation';
import { useEffect, useState } from 'react';
import { getDateRange } from 'utils/getters/getDateRange';
import { getKeysFromZodSchema } from 'utils/getters/getKeysFromZodSchema';
import { ZodObject, ZodRawShape } from 'zod';

export const useUrlManagedState = <T extends ZodRawShape>(
  schema: ZodObject<T>,
  searchParams: ReadonlyURLSearchParams,
  defaultRangeNumberOfDays?: number,
  pageSize?: number
) => {
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
    getDateRange({ days: defaultRangeNumberOfDays ?? 0 })
  );

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: _pageSize,
  } as PaginationState);

  const { replace } = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    const { pagination, ...search } = validateSearchParams();

    setFilters(search);
    getPaginationFromUrl(pagination);

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
    replace(`${pathname}${defaultStringifySearch({ ...filters, pagination })}`);
  }, [filters, pagination]);

  function getPaginationFromUrl(pagination: any) {
    const pageIndex = parseInt(pagination.pageIndex);
    const pageSize = parseInt(pagination.pageSize);

    if (isNaN(pageIndex) || isNaN(pageSize) || pageSize !== _pageSize)
      return setPagination({
        pageIndex: 0,
        pageSize: _pageSize,
      });

    setPagination({ pageIndex, pageSize });
  }

  return { filters, setFilters, range, setRange, pagination, setPagination };
};

export type UseUrlManagedState = ReturnType<typeof useUrlManagedState>;

export type TPagination = {
  pagination: UseUrlManagedState['pagination'];
  setPagination: UseUrlManagedState['setPagination'];
};
