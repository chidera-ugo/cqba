import clsx from 'clsx';
import { MoreInfo } from 'components/common/MoreInfo';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { formatAmount } from 'utils/helpers/formatAmount';
import { generatePlaceholderArray } from 'utils/helpers/generatePlaceholderArray';

export const Overview = () => {
  const { isLoading, isError, data } = useMakeDummyHttpRequest({
    method: 'get',
    res: {
      subAccountsBalance: 824482.31,
      budgetBalance: 48104,
      subAccountsCount: 13,
      requestsCount: 5,
      cardsCount: 67,
      activeBudgets: 381,
    },
  });

  if (isLoading) return <IsLoadingIsError type='loading' />;
  if (isError) return <IsLoadingIsError type='error' />;

  const payload = [
    {
      name: 'Total sum in sub accounts',
      value: data?.subAccountsBalance,
      isAmount: true,
      moreInfo: 'Total amount in your sub-accounts',
    },
    {
      name: 'Budget balance',
      value: data?.budgetBalance,
      isAmount: true,
      moreInfo: 'Total amount in your budget balance',
    },
    {
      name: 'No of sub-acccounts',
      value: data?.subAccountsCount,
    },
    {
      name: 'Active budgets',
      value: data?.activeBudgets,
    },
    {
      name: 'No of cards',
      value: data?.cardsCount,
    },
    {
      name: 'Total requests',
      value: data?.requestsCount,
    },
  ] as { name: string; value: any; isAmount?: boolean; moreInfo?: string }[];

  return (
    <div className='grid grid-cols-12 gap-5'>
      {payload.map(({ name, value, moreInfo, isAmount }, i) => {
        return (
          <div
            className={clsx(
              'card y-center col-span-12 h-[140px] 640:col-span-6 1280:col-span-4',
              i > 2 && 'hidden 640:block'
            )}
            key={name}
          >
            <div className='my-auto'>
              <div className='flex text-neutral-500'>
                <div>{name}</div>
                {moreInfo && <MoreInfo>{moreInfo}</MoreInfo>}
              </div>

              <div className={clsx('mt-3 text-3xl font-semibold')}>
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
      {generatePlaceholderArray(6).map((i) => {
        return (
          <div
            className='card y-center col-span-12 h-[140px] 640:col-span-6 1280:col-span-4'
            key={i}
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
                  'mt-7 h-8 w-[70%]',
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
