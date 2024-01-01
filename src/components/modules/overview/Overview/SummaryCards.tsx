import clsx from 'clsx';
import { SummaryWithVariance } from 'components/modules/overview/Overview/SummaryWithVariance';
import { useGetDashboardSummary } from 'hooks/api/dashboard/useGetDashboardSummary';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useUserRole } from 'hooks/access_control/useUserRole';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { generatePlaceholderArray } from 'utils/generators/generatePlaceholderArray';
import { DateRange } from 'utils/getters/getDateRange';

export const SummaryCards = ({ range }: { range: DateRange }) => {
  const { isVerified } = useIsVerified();
  const { isOwner } = useUserRole();

  const { primaryWallet } = useManageWallets();
  const currency = primaryWallet?.currency;

  const { isLoading, isError, data } = useGetDashboardSummary(range, currency, {
    enabled: isVerified && !!currency,
  });

  if (isLoading && !!primaryWallet?._id)
    return <IsLoadingIsError isOwner={isOwner} type='loading' />;

  if (isError) return <IsLoadingIsError isOwner={isOwner} type='error' />;

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
      disabled: !isOwner,
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
      variance: data?.totalSpend?.percentageDiff,
    },
  ];

  return (
    <div className='flex flex-col gap-3 640:flex-row 640:gap-5'>
      {payload
        .filter(({ disabled }) => !disabled)
        .map(({ name, value, variance, moreInfo, isAmount }, i) => {
          const _val = Number(value ?? 0) / 100;

          return (
            <div
              className={clsx(
                'card y-center h-[116px] min-w-[300px] 480:min-w-[360px] 640:h-[132px]',
                !isOwner && '640:max-w-none',
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
        })}
    </div>
  );
};

const IsLoadingIsError = ({
  type,
  isOwner,
}: {
  type: 'loading' | 'error';
  isOwner: boolean;
}) => {
  return (
    <div className='flex flex-col gap-3 640:flex-row 640:gap-5'>
      {generatePlaceholderArray(isOwner ? 3 : 2).map((id) => {
        return (
          <div
            className={clsx(
              'card y-center h-[116px] min-w-[300px] 480:min-w-[360px] 640:h-[132px]'
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
