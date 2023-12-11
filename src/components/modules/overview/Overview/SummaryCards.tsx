import clsx from 'clsx';
import { SummaryWithVariance } from 'components/modules/overview/Overview/SummaryWithVariance';
import { useGetDashboardSummary } from 'hooks/api/dashboard/useGetDashboardSummary';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useUserRole } from 'hooks/rbac/useUserRole';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { Fragment } from 'react';
import { generatePlaceholderArray } from 'utils/generators/generatePlaceholderArray';
import { DateRange } from 'utils/getters/getDateRange';

export const SummaryCards = ({ range }: { range: DateRange }) => {
  const { isVerified } = useIsVerified();
  const { isOwner } = useUserRole();

  const { primaryWallet } = useManageWallets();

  const { isLoading, isError, data } = useGetDashboardSummary(
    range,
    primaryWallet?.currency,
    {
      enabled: isVerified,
    }
  );

  if (isLoading) return <IsLoadingIsError type='loading' />;
  if (isError) return <IsLoadingIsError type='error' />;

  const payload: {
    name: string;
    value: any;
    isAmount?: boolean;
    disabled?: boolean;
    moreInfo?: string;
    variance?: number;
  }[] = [
    {
      name: 'Account Balance',
      value: data?.accountBalance?.value,
      moreInfo: 'Total amount in your wallet',
      variance: data?.accountBalance?.percentageDiff,
    },
    {
      name: 'Budget Balance',
      value: data?.budgetBalance?.value,
      moreInfo: 'Total amount in your budget balance',
      variance: data?.budgetBalance?.percentageDiff,
    },
    {
      name: 'Total Spend',
      value: data?.totalSpend?.value,
      disabled: !isOwner,
      variance: data?.totalSpend?.percentageDiff,
    },
  ];

  return (
    <div className='grid grid-cols-12 gap-5'>
      {payload.map(
        ({ name, value, disabled, variance, moreInfo, isAmount }, i) => {
          if (disabled) return <Fragment key={name} />;

          const _val = Number(value ?? 0) / 100;

          return (
            <div
              className={clsx(
                'card y-center col-span-12 h-[116px] 640:col-span-6 640:h-[132px]',
                isOwner && '1280:col-span-4',
                i === 0 && 'bg-primary-main text-white'
              )}
              key={name}
            >
              <SummaryWithVariance
                className={i === 0 ? 'text-white' : 'text-neutral-500'}
                currency={data?.currency}
                value={_val}
                {...{
                  name,
                  variance,
                  moreInfo,
                  isAmount,
                }}
              />
            </div>
          );
        }
      )}
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
              'card y-center col-span-12 h-[116px] 640:col-span-6 640:h-[132px] 1280:col-span-4'
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
