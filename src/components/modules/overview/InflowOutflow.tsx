import clsx from 'clsx';
import { InflowOutflowChart } from 'components/charts/overview/InflowOutflowChart';
import { useGetChartDataByMonth } from 'hooks/charts/useGetChartDataByMonth';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { useState } from 'react';
import { formatAmount } from 'utils/formatters/formatAmount';

export const InflowOutflow = () => {
  const [filter, setFilter] = useState<'inflow' | 'outflow'>('inflow');
  const { chartData: _ } = useGetChartDataByMonth();

  const { isLoading, isError, data } = useMakeDummyHttpRequest({
    method: 'get',
    res: {
      balance: 318301.41,
    },
  });

  if (isLoading) return <IsLoadingIsError type='loading' />;
  if (isError) return <IsLoadingIsError type='error' />;

  const chartData = {
    label: 'Sales Volume',
    data: [
      {
        primary: '2023-06-09T00:00:00.000Z',
        secondary: 89,
      },
      {
        primary: '2023-06-10T00:00:00.000Z',
        secondary: 91,
      },
      {
        primary: '2023-06-11T00:00:00.000Z',
        secondary: 13,
      },
      {
        primary: '2023-06-12T00:00:00.000Z',
        secondary: 66,
      },
      {
        primary: '2023-06-13T00:00:00.000Z',
        secondary: 68,
      },
      {
        primary: '2023-06-14T00:00:00.000Z',
        secondary: 87,
      },
      {
        primary: '2023-06-15T00:00:00.000Z',
        secondary: 61,
      },
      {
        primary: '2023-06-16T00:00:00.000Z',
        secondary: 56,
      },
      {
        primary: '2023-06-17T00:00:00.000Z',
        secondary: 91,
      },
      {
        primary: '2023-06-18T00:00:00.000Z',
        secondary: 38,
      },
    ],
  };

  return (
    <div className='card p-0'>
      <div className='p-5'>
        <div className='flex gap-2'>
          <button
            onClick={() => setFilter('inflow')}
            className={clsx(
              'h-11 px-5 text-sm duration-[0ms]',
              filter === 'inflow'
                ? 'primary-button hover:bg-primary-main'
                : 'light-button border-neutral-400 text-neutral-500 hover:border-primary-main hover:bg-white'
            )}
          >
            Total Inflow
          </button>

          <button
            onClick={() => setFilter('outflow')}
            className={clsx(
              'h-11 px-5 text-sm duration-[0ms]',
              filter === 'outflow'
                ? 'primary-button hover:bg-primary-main'
                : 'light-button border-neutral-400 text-neutral-500 hover:border-primary-main hover:bg-white'
            )}
          >
            Total Outflow
          </button>
        </div>

        <div className={clsx('mt-3 text-3xl font-semibold')}>
          <span className='mr-1'>NGN</span>
          {formatAmount({ value: data?.balance, decimalPlaces: 2 })}
        </div>
      </div>

      <div className='h-[300px] overflow-x-auto px-3'>
        <div className='thin-scrollbar h-full min-w-[900px]'>
          <InflowOutflowChart
            {...{
              chartData,
            }}
          />
        </div>
      </div>
    </div>
  );
};

const IsLoadingIsError = ({ type }: { type: 'loading' | 'error' }) => {
  return (
    <div className='card'>
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
            'mr-1 mt-4 h-12 w-[400px] rounded-lg',
            type === 'loading' ? 'skeleton' : 'skeleton-error'
          )}
        ></div>
      </div>

      <div
        className={clsx(
          'mt-8 h-[300px] rounded-lg',
          type === 'loading' ? 'skeleton' : 'skeleton-error'
        )}
      ></div>
    </div>
  );
};
