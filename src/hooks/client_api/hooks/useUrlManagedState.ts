import { defaultStringifySearch } from 'hooks/client_api/search_params';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getDateRange } from 'utils/getters/getDateRange';

export const useUrlManagedState = (
  validateSearch: () => any,
  defaultRangeNumberOfDays?: number
) => {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [range, setRange] = useState(
    getDateRange({ days: defaultRangeNumberOfDays ?? 0 })
  );

  const { replace } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const search = validateSearch();

    setFilters(search);

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
    replace(`${pathname}${defaultStringifySearch(filters)}`);
  }, [filters]);

  return { filters, setFilters, range, setRange };
};

export type UseUrlManagedState = ReturnType<typeof useUrlManagedState>;
