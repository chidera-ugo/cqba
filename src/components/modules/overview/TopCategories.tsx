import clsx from 'clsx';
import { TopCategoriesChart } from 'components/charts/overview/TopCategoriesChart';
import { Filter } from 'components/form-elements/Filter';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { CalendarIcon } from 'components/svgs/others/CalendarIcon';
import { useMakeDummyHttpRequest } from 'hooks/commons/useMakeDummyHttpRequest';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useState } from 'react';
import { getDateRange } from 'utils/getters/getDateRange';

export const TopCategories = () => {
  const durationFilterOptions = [
    { value: 7, name: 'Last 7 Days' },
    { value: 30, name: 'Last 30 Days' },
  ];

  const [_, setDateRange] = useState(
    getDateRange({ days: Number(durationFilterOptions[0]?.value) })
  );

  const [filters, setFilters] = useState<Record<string, any>>({
    duration: durationFilterOptions[0],
  });

  const { isVerified } = useIsVerified();

  const categories = [
    'Salaries',
    'Transportation',
    'Food',
    'Research',
    'Internet',
    'Marketing',
  ];

  function generateData() {
    const data: { category: string; value: number }[] = [];

    for (let i = 0; i < categories.length; i++) {
      data.push({
        category: categories[i]!,
        value: Math.floor(Math.random() * 100),
      });
    }

    const total = data.reduce((a, b) => a + b.value, 0);

    return data.map(({ category, value }) => ({
      category,
      value: Number(((value * 100) / total).toFixed(2)),
    }));
  }

  const { isLoading, isFetching, isError, data } = useMakeDummyHttpRequest({
    res: generateData(),
    method: 'get',
  });

  const chartData = data?.map(({ category, value }) => {
    return {
      category,
      value,
    };
  });

  return (
    <div className='card max-w-[400px] p-0'>
      <div className='x-between relative h-[78px] p-5'>
        <h5>Top Categories</h5>

        <div className='flex gap-3'>
          {isFetching && (
            <div className='my-auto'>
              <Spinner className={'h-5 w-5 text-primary-main'} />
            </div>
          )}

          <Filter
            icon={<CalendarIcon />}
            filterKey='duration'
            id='top-categories-chart-duration-filter'
            {...{ filters, setFilters }}
            secondaryAction={(option) => {
              if (typeof option.value !== 'number') {
              } else {
                setDateRange(getDateRange({ days: option.value }));
              }
            }}
            dropdownClassName='min-w-[170px] right-0'
            options={durationFilterOptions}
          />
        </div>
      </div>

      <div className='h-[420px]'>
        {!isVerified ? (
          <TopCategoriesChart chartData={[]} />
        ) : isLoading ? (
          <IsLoadingIsError type={'loading'} />
        ) : isError || !chartData ? (
          <IsLoadingIsError type={'error'} />
        ) : (
          <TopCategoriesChart chartData={chartData} />
        )}
      </div>
    </div>
  );
};

const IsLoadingIsError = ({ type }: { type: 'loading' | 'error' }) => {
  return (
    <div className='h-full p-5 pt-0'>
      <div
        className={clsx(
          'h-full rounded-lg',
          type === 'loading' ? 'skeleton' : 'skeleton-error'
        )}
      ></div>
    </div>
  );
};
