import clsx from 'clsx';
import { InflowOutflowChart } from 'components/charts/overview/InflowOutflowChart';
import { Filter } from 'components/form-elements/Filter';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { useGetInflowOutflowChart } from 'hooks/api/dashboard/useGetInflowOutflowChart';
import { usePopulateEmptyChartData } from 'hooks/charts/usePopulateEmptyChartData';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useState } from 'react';
import { formatAmount } from 'utils/formatters/formatAmount';
import { getDateRange } from 'utils/getters/getDateRange';

export const InflowOutflow = () => {
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

  const { isLoading, isFetching, isError, data } = useGetInflowOutflowChart(
    {
      type: filters.transactionType.value,
      duration: 'DAILY',
      dateRange,
    },
    {
      enabled: isVerified,
    }
  );

  if (isVerified && isLoading) return <IsLoadingIsError type='loading' />;
  if (isError) return <IsLoadingIsError type='error' />;

  const chartData = data?.chart.map(({ volume, date }) => {
    return {
      primary: date,
      secondary: volume,
    };
  });

  return (
    <div className='card p-0'>
      <div className='x-between relative block p-5 768:flex'>
        <div className='flex gap-2'>
          <div className='flex gap-3'>
            <Filter
              withChevron
              filterKey='transactionType'
              id='inflow-outflow-chart-type-filter'
              {...{ filters, setFilters }}
              dropdownClassName='left-0'
              options={transactionTypeFilterOptions}
            />

            <div className='my-auto h-5 w-[1px] bg-neutral-200'></div>

            <Filter
              withChevron
              filterKey='duration'
              id='inflow-outflow-chart-duration-filter'
              {...{ filters, setFilters }}
              secondaryAction={(option) => {
                if (typeof option.value !== 'number') {
                } else {
                  setDateRange(getDateRange({ days: option.value }));
                }
              }}
              dropdownClassName='min-w-[170px] left-0'
              options={durationFilterOptions}
            />
          </div>

          {isFetching && (
            <div className='my-auto ml-2'>
              <Spinner className={'h-5 w-5 text-primary-main'} />
            </div>
          )}
        </div>

        <div className={clsx('my-auto mt-4 text-3xl font-semibold 768:mt-0')}>
          <span className='mr-1'>₦</span>
          {formatAmount({ value: data?.totalBalance, decimalPlaces: 2 })}
        </div>
      </div>

      <div className='h-[300px] overflow-x-auto px-3'>
        <div className='thin-scrollbar h-full min-w-[900px]'>
          <InflowOutflowChart
            chartData={chartData?.length ? chartData : getChartData(7)}
          />
        </div>
      </div>
    </div>
  );
};

const IsLoadingIsError = ({ type }: { type: 'loading' | 'error' }) => {
  return (
    <div className='card'>
      <div className='x-between block 768:flex'>
        <div className='flex gap-2'>
          <div
            className={clsx(
              'h-11 w-[100px] rounded-full',
              type === 'loading' ? 'skeleton' : 'skeleton-error'
            )}
          ></div>
          <div
            className={clsx(
              'h-11 w-[100px] rounded-full',
              type === 'loading' ? 'skeleton' : 'skeleton-error'
            )}
          ></div>
        </div>

        <div className='mt-4 flex 768:mt-0'>
          <div
            className={clsx(
              'mr-1 h-10 w-[200px] rounded-lg',
              type === 'loading' ? 'skeleton' : 'skeleton-error'
            )}
          ></div>
        </div>
      </div>

      <div
        className={clsx(
          'mt-4 h-[280px] rounded-lg',
          type === 'loading' ? 'skeleton' : 'skeleton-error'
        )}
      ></div>
    </div>
  );
};
