import clsx from 'clsx';
import { InflowOutflowChart } from 'components/charts/overview/InflowOutflowChart';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { useGetInflowOutflowChart } from 'hooks/api/dashboard/useGetInflowOutflowChart';
import { usePopulateEmptyChartData } from 'hooks/charts/usePopulateEmptyChartData';
import { useState } from 'react';
import { formatAmount } from 'utils/formatters/formatAmount';
import { getDateRange } from 'utils/getters/getDateRange';

export const InflowOutflow = () => {
  const [filter, setFilter] = useState('INFLOW');

  const { getChartData } = usePopulateEmptyChartData();

  const { isLoading, isFetching, isError, data } = useGetInflowOutflowChart({
    type: filter,
    duration: 'DAILY',
    dateRange: getDateRange({ days: 7 }),
  });

  if (isLoading) return <IsLoadingIsError type='loading' />;
  if (isError) return <IsLoadingIsError type='error' />;

  const chartData = data?.chart.map(({ volume, date }) => {
    return {
      primary: date,
      secondary: volume,
    };
  });

  return (
    <div className='card p-0'>
      <div className='x-between relative p-5'>
        <div className='flex gap-2'>
          <button
            onClick={() => setFilter('INFLOW')}
            className={clsx(
              'h-11 px-5 text-sm duration-[0ms]',
              filter === 'INFLOW'
                ? 'primary-button hover:bg-primary-main'
                : 'light-button border-neutral-400 text-neutral-500 hover:border-primary-main hover:bg-white'
            )}
          >
            Total Inflow
          </button>

          <button
            onClick={() => setFilter('OUTFLOW')}
            className={clsx(
              'h-11 px-5 text-sm duration-[0ms]',
              filter === 'OUTFLOW'
                ? 'primary-button hover:bg-primary-main'
                : 'light-button border-neutral-400 text-neutral-500 hover:border-primary-main hover:bg-white'
            )}
          >
            Total Outflow
          </button>

          {isFetching && (
            <div className='my-auto ml-2'>
              <Spinner className={'h-5 w-5 text-primary-main'} />
            </div>
          )}
        </div>

        <div className={clsx('my-auto text-3xl font-semibold')}>
          <span className='mr-1'>NGN</span>
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
      <div className='x-between'>
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

        <div className='flex'>
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
