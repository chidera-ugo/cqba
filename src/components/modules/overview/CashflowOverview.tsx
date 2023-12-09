import clsx from 'clsx';
import { AnalyticsChart } from 'components/charts/overview/AnalyticsChart';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { NoData } from 'components/core/Table/NoData';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { Filter } from 'components/form-elements/Filter';
import { EmptyChart } from 'components/svgs/overview/EmptyChart';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { CalendarIcon } from 'components/svgs/others/CalendarIcon';
import {
  periodPresetOptions,
  transactionTypeFilterOptions,
} from 'constants/overview/filters';
import { motion } from 'framer-motion';
import { useGetCashflowChart } from 'hooks/api/dashboard/useGetCashflowChart';
import { usePopulateEmptyChartData } from 'hooks/charts/usePopulateEmptyChartData';
import { UseUrlManagedState } from 'hooks/client_api/hooks/useUrlManagedState';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { getDateRange } from 'utils/getters/getDateRange';

export const CashflowOverview = ({
  filters,
  setFilters,
  range,
  setRange,
}: Omit<UseUrlManagedState, 'pagination' | 'setPagination'>) => {
  const { primaryWallet } = useManageWallets();
  const { getChartData } = usePopulateEmptyChartData();

  const { isVerified } = useIsVerified();

  const period = filters?.rangePreset?.value > 30 ? 'months' : 'days';
  const transactionType = filters?.transactionType?.value;

  const { isLoading, isError, isFetching, data } = useGetCashflowChart(
    transactionType,
    period,
    range,
    primaryWallet?.currency,
    {
      enabled: isVerified,
    }
  );

  const chartData = data?.trend?.map(({ amount, from }) => {
    return {
      primary: from,
      secondary: amount / 100,
    };
  });

  return (
    <div className='card p-0'>
      <div className='x-between relative flex p-5'>
        <h5 className={'text-base font-medium'}>Cashflow Overview</h5>

        <div className='flex gap-3'>
          {isFetching && (
            <div className='my-auto'>
              <Spinner className={'h-5 w-5 text-primary-main'} />
            </div>
          )}

          <Filter
            icon={<CalendarIcon />}
            filterKey='transactionType'
            withChevron
            buttonClassname={'h-9'}
            id='cashflow_chart_duration_filter'
            {...{ filters, setFilters }}
            dropdownClassName='min-w-[170px] right-0'
            options={transactionTypeFilterOptions}
          />

          <div className='h-9 cursor-pointer overflow-hidden rounded-full border border-neutral-200'>
            {periodPresetOptions.map(({ value, name }, i) => {
              const isActive = filters?.rangePreset?.value === value;
              const id = `range_preset_${name}`;

              return (
                <button
                  onClick={() => {
                    setFilters((prev) => ({
                      ...prev!,
                      rangePreset: {
                        value,
                        name,
                      },
                    }));

                    setRange(getDateRange({ days: value }));
                  }}
                  id={id}
                  key={id}
                  type='button'
                  className={clsx(
                    'relative h-full w-[90px] transition-none',
                    i > 0 && 'border-l border-neutral-200'
                  )}
                >
                  <span
                    className={clsx(
                      `y-center smooth relative z-10 h-full flex-shrink-0 px-1 text-xs font-medium 340:text-sm`,
                      isActive ? 'text-black' : 'text-neutral-500'
                    )}
                  >
                    {name}
                  </span>

                  {isActive && (
                    <motion.div
                      className='absolute inset-0 z-0 h-full w-full'
                      transition={{
                        duration: 0.3,
                      }}
                      layoutId={'range_preset'}
                    >
                      <div className={clsx(`h-full w-full bg-[#F0F2F5]`)}></div>
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className='y-center h-[520px]'>
        {isVerified && isLoading && !data ? (
          <IsLoading />
        ) : isError ? (
          <IsError className={'py-20'} />
        ) : !chartData?.length ? (
          <div>
            <NoData
              noToast
              processing={isLoading}
              icon={<EmptyChart />}
              subTitle={`Your expense report will be displayed here`}
            />
          </div>
        ) : (
          <div className='x-thin-scrollbar h-full overflow-x-auto px-3'>
            <AppErrorBoundary className='h-full min-w-[700px]'>
              <AnalyticsChart
                color={transactionType === 'credit' ? '#1A44ED' : '#b20000'}
                period={period}
                chartData={chartData?.length ? chartData : getChartData(7)}
              />
            </AppErrorBoundary>
          </div>
        )}
      </div>
    </div>
  );
};
