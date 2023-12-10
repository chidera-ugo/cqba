import clsx from 'clsx';
import { SummaryWithVariance } from 'components/modules/overview/Overview/SummaryWithVariance';
import { useGetDashboardSummary } from 'hooks/api/dashboard/useGetDashboardSummary';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { formatAmount } from 'utils/formatters/formatAmount';
import { generatePlaceholderArray } from 'utils/generators/generatePlaceholderArray';
import { DateRange } from 'utils/getters/getDateRange';

export const SummaryCards = ({ range }: { range: DateRange }) => {
  const { isVerified } = useIsVerified();

  const { primaryWallet } = useManageWallets();

  const { isLoading, isError, data } = useGetDashboardSummary(range, {
    enabled: isVerified,
  });

  if (isLoading) return <IsLoadingIsError type='loading' />;
  if (isError) return <IsLoadingIsError type='error' />;

  const payload: {
    name: string;
    value: any;
    isAmount?: boolean;
    moreInfo?: string;
    hideInMobile?: boolean;
    variance?: number;
  }[] = [
    {
      name: 'Account Balance',
      value: data?.budgetBalance,
      isAmount: true,
      moreInfo: 'Total amount in your wallet',
      variance: 20,
    },
    {
      name: 'Budget Balance',
      value: 0,
      isAmount: true,
      moreInfo: 'Total amount in your budget balance',
      variance: 20,
    },
    {
      name: 'Total Payouts',
      value: data?.requestsCount,
      isAmount: true,
      variance: 20,
    },
  ];

  return (
    <div className='grid grid-cols-12 gap-5'>
      {payload.map(({ name, value, variance, moreInfo, isAmount }, i) => {
        return (
          <div
            className={clsx(
              'card y-center col-span-12 h-[132px] 640:col-span-6 1280:col-span-4',
              i === 0 && 'bg-primary-main text-white'
            )}
            key={name}
          >
            <SummaryWithVariance
              className={i === 0 ? 'text-white' : 'text-neutral-500'}
              currency={primaryWallet?.currency}
              value={formatAmount({
                value: value,
                decimalPlaces: isAmount ? 2 : 0,
                kFormatter: value > 999999,
              })}
              {...{
                name,
                variance,
                moreInfo,
                isAmount,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const IsLoadingIsError = ({ type }: { type: 'loading' | 'error' }) => {
  return (
    <div className='grid grid-cols-12 gap-5'>
      {generatePlaceholderArray(3).map((id) => {
        return (
          <div
            className={clsx(
              'card y-center col-span-12 h-[132px] 640:col-span-6 1280:col-span-4'
            )}
            key={id}
          >
            <div className='my-auto'>
              <div
                className={clsx(
                  'h-5 w-[50%]',
                  type === 'loading' ? 'skeleton' : 'skeleton-error'
                )}
              ></div>
              <div
                className={clsx(
                  'mt-2 h-8 w-[70%]',
                  type === 'loading' ? 'skeleton' : 'skeleton-error'
                )}
              ></div>
              <div
                className={clsx(
                  'mt-2 h-4 w-[50%]',
                  type === 'loading' ? 'skeleton' : 'skeleton-error'
                )}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
