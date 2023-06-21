import clsx from 'clsx';
import { MoreInfo } from 'components/common/MoreInfo';
import { useGetDashboardSummary } from 'hooks/api/dashboard/useGetDashboardSummary';
import { formatAmount } from 'utils/formatters/formatAmount';
import { generatePlaceholderArray } from 'utils/generators/generatePlaceholderArray';

export const Overview = () => {
  const { isLoading, isError, data } = useGetDashboardSummary();

  if (isLoading) return <IsLoadingIsError type='loading' />;
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
      name: 'Total requests',
      value: data?.requestsCount,
    },
    {
      name: 'No of sub-acccounts',
      value: data?.subAccountsCount,
    },
    {
      name: 'Active budgets',
      value: data?.activeBudgetCount,
    },
  ];

  return (
    <div className='grid grid-cols-12 gap-5'>
      {payload.map(({ name, value, moreInfo, isAmount }, i) => {
        return (
          <div
            className={clsx(
              'card y-center h-[100px] 640:h-[140px]',
              i > 1 && 'hidden 640:flex',
              i < 2
                ? 'col-span-12 1280:col-span-6'
                : 'col-span-6 880:col-span-4'
            )}
            key={name}
          >
            <div className='my-auto'>
              <div className='flex text-sm text-neutral-500 640:text-base'>
                <div>{name}</div>
                {moreInfo && <MoreInfo>{moreInfo}</MoreInfo>}
              </div>

              <div
                className={clsx(
                  'mt-2 text-2xl font-semibold 640:mt-3 640:text-3xl'
                )}
              >
                {isAmount && <span className='mr-1.5'>NGN</span>}
                {formatAmount({
                  value,
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
      {generatePlaceholderArray(5).map((id, i) => {
        return (
          <div
            className={clsx(
              'card y-center h-[100px] 640:h-[140px]',
              i > 1 && 'hidden 640:flex',
              i < 2
                ? 'col-span-12 1280:col-span-6'
                : 'col-span-6 880:col-span-4'
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
                  'mt-4 h-8 w-[70%] 640:mt-7',
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
