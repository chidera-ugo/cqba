import clsx from 'clsx';
import { AnalyticsChart } from 'components/charts/overview/AnalyticsChart';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { NoData } from 'components/core/Table/NoData';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { Filter } from 'components/form-elements/Filter';
import { SummaryWithVariance } from 'components/modules/overview/Overview/SummaryWithVariance';
import { EmptyChart } from 'components/svgs/overview/EmptyChart';
import { Spinner } from 'components/svgs/dashboard/Spinner';
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
import Link from 'next/link';
import { formatAmount } from 'utils/formatters/formatAmount';
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

  const amount = Number(data?.amount?.value ?? 0) / 100;

  return (
    <div className='card p-0'>
      <div className='relative justify-between p-5 768:flex 768:h-[140px]'>
        <div>
          <SummaryWithVariance
            name={`Total ${
              transactionType === 'credit' ? 'Income' : 'Expense'
            }`}
            isAmount
            currency={primaryWallet?.currency}
            className={'text-neutral-500'}
            variance={data?.amount?.percentageDiff}
            value={formatAmount({
              value: amount,
              decimalPlaces: 2,
              kFormatter: amount > 99999999,
            })}
          />
        </div>

        <div className='mb-auto mt-2 flex gap-3 768:mt-0'>
          <Filter
            filterKey='transactionType'
            withChevron
            buttonClassname={'h-9'}
            id='cashflow_chart_duration_filter'
            {...{ filters, setFilters }}
            dropdownClassName='min-w-[170px] left-0 768:right-0'
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

      <div className='y-centers h-[400px]'>
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
            <AppErrorBoundary className='relative h-full min-w-[700px]'>
              {isFetching && (
                <div className='absolute right-3 top-3'>
                  <Spinner className={'mx-auto h-5 w-5 text-primary-main'} />
                </div>
              )}

              <AnalyticsChart
                color={transactionType !== 'credit' ? '#1A44ED' : '#30b902'}
                period={period}
                chartData={chartData?.length ? chartData : getChartData(7)}
              />
            </AppErrorBoundary>
          </div>
        )}
      </div>

      <div className='x-center w-full border-t border-neutral-200 p-3'>
        <Link
          href={'/analytics'}
          className={'w-full text-center text-sm font-medium text-primary-main'}
        >
          View Expense Report
        </Link>
      </div>
    </div>
  );
};
