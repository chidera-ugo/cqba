import clsx from 'clsx';
import { MoreInfo } from 'components/common/MoreInfo';
import { useGetDashboardSummary } from 'hooks/api/dashboard/useGetDashboardSummary';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { formatAmount } from 'utils/formatters/formatAmount';
import { generatePlaceholderArray } from 'utils/generators/generatePlaceholderArray';

export const Overview = () => {
  const { isVerified } = useIsVerified();

  const { isLoading, isError, data } = useGetDashboardSummary({
    enabled: isVerified,
  });

  if (isVerified && isLoading) return <IsLoadingIsError type='loading' />;
  if (isError) return <IsLoadingIsError type='error' />;

  const payload: {
    name: string;
    value: any;
    isAmount?: boolean;
    moreInfo?: string;
    hideInMobile?: boolean;
  }[] = [
    {
      name: 'Total sum in sub accounts',
      value: data?.subAccountBalance,
      isAmount: true,
      moreInfo: 'Total amount in your sub-accounts',
      hideInMobile: true,
    },
    {
      name: 'Budget balance',
      value: data?.budgetBalance,
      isAmount: true,
      moreInfo: 'Total amount in your budget balance',
    },
    {
      name: 'Total payouts',
      value: data?.requestsCount,
      isAmount: true,
    },
  ];

  return (
    <div className='grid grid-cols-12 gap-5'>
      {payload.map(({ name, value, moreInfo, isAmount }, i) => {
        return (
          <div
            className={clsx(
              'card y-center col-span-12 py-4 640:col-span-6 1280:col-span-4',
              i === 0 && 'bg-primary-main text-white'
            )}
            key={name}
          >
            <div className='my-auto'>
              <div
                className={clsx(
                  'flex text-sm 640:text-base',
                  i === 0 ? 'text-white' : 'text-neutral-500'
                )}
              >
                <div>{name}</div>
                {moreInfo && <MoreInfo>{moreInfo}</MoreInfo>}
              </div>

              <div
                className={clsx(
                  'mt-2 text-2xl font-semibold 640:mt-3 640:text-3xl'
                )}
              >
                {isAmount && <span className='mr-1.5'>₦</span>}
                {formatAmount({
                  value: value,
                  decimalPlaces: isAmount ? 2 : 0,
                  kFormatter: value > 999999,
                })}
              </div>
            </div>
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
              'card y-center col-span-12 h-[94px] 640:col-span-6 640:h-[106px] 1280:col-span-4'
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
                  'mt-4 h-8 w-[70%] 640:mt-4',
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
