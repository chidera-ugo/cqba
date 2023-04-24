import clsx from 'clsx';
import { InflowOutflowChart } from 'components/charts/overview/InflowOutflowChart';
import { useGetChartDataByMonth } from 'hooks/charts/useGetChartDataByMonth';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { useState } from 'react';
import { formatAmount } from 'utils/helpers/formatAmount';

export const InflowOutflow = () => {
  const [filter, setFilter] = useState<'inflow' | 'outflow'>('inflow');
  const { chartData: _ } = useGetChartDataByMonth();

  const { isLoading, isError, data } = useMakeDummyHttpRequest({
    method: 'get',
    res: {
      balance: 318301.41,
    },
    onSuccess() {
      // setProvidedData((prev) => ({
      //   ...prev,
      //   [Number(mon) - 1]: {
      //     value,
      //     volume,
      //   },
      // }));
    },
  });

  if (isLoading) return <IsLoadingIsError type='loading' />;
  if (isError) return <IsLoadingIsError type='error' />;

  const chartData = [
    {
      date: '2023-01-31T23:00:00.000Z',
      value: 313,
    },
    {
      date: '2023-02-05T23:00:00.000Z',
      value: 122100,
    },
    {
      date: '2023-03-11T23:00:00.000Z',
      value: 1003541700,
    },
    {
      date: '2023-04-13T23:00:00.000Z',
      value: 11700,
    },
    {
      date: '2023-05-29T23:00:00.000Z',
      value: 141700,
    },
    {
      date: '2023-06-12T23:00:00.000Z',
      value: 1700,
    },
    {
      date: '2023-07-30T23:00:00.000Z',
      value: 54700,
    },
    {
      date: '2023-08-12T23:00:00.000Z',
      value: 100354700,
    },
  ];

  return (
    <div className='card'>
      <div className='flex gap-2'>
        <button
          onClick={() => setFilter('inflow')}
          className={clsx(
            'h-11  px-5 text-sm',
            filter === 'inflow'
              ? 'primary-button'
              : 'light-button border-neutral-400 text-neutral-500'
          )}
        >
          Total Inflow
        </button>

        <button
          onClick={() => setFilter('outflow')}
          className={clsx(
            'h-11 px-5 text-sm',
            filter === 'outflow'
              ? 'primary-button'
              : 'light-button border-neutral-400 text-neutral-500'
          )}
        >
          Total Outflow
        </button>
      </div>

      <div className={clsx('mt-3 text-3xl font-semibold')}>
        <span className='mr-1'>NGN</span>
        {formatAmount({ value: data?.balance, decimalPlaces: 2 })}
      </div>

      <div className='mt-8 h-[300px]'>
        <InflowOutflowChart {...{ chartData }} />
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
