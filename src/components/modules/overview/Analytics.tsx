import clsx from 'clsx';
import { AnalyticsChart } from 'components/charts/overview/AnalyticsChart';
import { Filter } from 'components/form-elements/Filter';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { CalendarIcon } from 'components/svgs/others/CalendarIcon';
import { useGetAnalyticsChart } from 'hooks/api/dashboard/useGetAnalyticsChart';
import { usePopulateEmptyChartData } from 'hooks/charts/usePopulateEmptyChartData';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useState } from 'react';
import { getDateRange } from 'utils/getters/getDateRange';

export const Analytics = () => {
  const durationFilterOptions = [
    { value: 7, name: 'Last 7 Days' },
    { value: 30, name: 'Last 30 Days' },
  ];

  const transactionTypeFilterOptions = [
    { value: 'INFLOW', name: 'Inflow' },
    { value: 'OUTFLOW', name: 'Outflow' },
  ];

  const [dateRange, setDateRange] = useState(
    getDateRange({ days: Number(durationFilterOptions[0]?.value) })
  );

  const [filters, setFilters] = useState<Record<string, any>>({
    duration: durationFilterOptions[0],
    transactionType: transactionTypeFilterOptions[0],
  });

  const { getChartData } = usePopulateEmptyChartData();

  const { isVerified } = useIsVerified();

  const { isLoading, isFetching, isError, data } = useGetAnalyticsChart(
    {
      type: filters.transactionType.value,
      duration: 'DAILY',
      dateRange,
    },
    {
      enabled: isVerified,
    }
  );

  const chartData = data?.chart.map(({ volume, date }) => {
    return {
      primary: date,
      secondary: volume,
    };
  });

  return (
    <div className='card p-0'>
      <div className='x-between relative flex p-5'>
        <h5>Analytics</h5>

        <div className='flex gap-3'>
          {isFetching && (
            <div className='my-auto'>
              <Spinner className={'h-5 w-5 text-primary-main'} />
            </div>
          )}

          <Filter
            icon={<CalendarIcon />}
            filterKey='duration'
            id='analytics-chart-duration-filter'
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
        {isVerified && isLoading ? (
          <IsLoadingIsError type={'loading'} />
        ) : isError ? (
          <IsLoadingIsError type={'error'} />
        ) : (
          <div className='x-thin-scrollbar h-full overflow-x-auto px-3'>
            <div className='h-full min-w-[700px]'>
              <AnalyticsChart
                chartData={chartData?.length ? chartData : getChartData(7)}
              />
            </div>
          </div>
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
