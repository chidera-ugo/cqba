import clsx from 'clsx';
import { SummaryWithVariance } from 'components/modules/overview/Overview/SummaryWithVariance';
import { useGetWalletBalances } from 'hooks/api/wallet/useGetWalletBalances';
import { useUserRole } from 'hooks/access_control/useUserRole';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import Link from 'next/link';

export const WalletOverview = () => {
  const { isOwner } = useUserRole();

  const { isLoading, isError, primaryWallet } = useManageWallets();

  const { isLoading: _l, isError: _e, data } = useGetWalletBalances();

  if (isLoading || _l) return <IsLoadingIsError isLoading />;
  if (isError || _e) return <IsLoadingIsError />;

  console.log(data);

  return (
    <div className='grid-cols-2 gap-4 640:grid'>
      {isOwner && (
        <div className='card'>
          <SummaryWithVariance
            value={
              !primaryWallet
                ? 0
                : (data?.wallet?.find(
                    ({ currency }) => currency === primaryWallet?.currency
                  )?.balance ?? 0) / 100
            }
            currency={primaryWallet?.currency}
            name='Account Balance'
            moreInfo='Your main wallet balance'
          />
        </div>
      )}

      <div className='card relative mt-4 640:mt-0'>
        <SummaryWithVariance
          value={
            !primaryWallet
              ? 0
              : (data?.budget?.find(
                  ({ currency }) => currency === primaryWallet?.currency
                )?.balance ?? 0) / 100
          }
          currency={primaryWallet?.currency}
          name='Budget Balance'
          moreInfo='Your total budget balance'
        />

        <Link
          href={'/budgeting'}
          className={'pill_gray absolute right-3 top-3 640:right-5 640:top-5'}
        >
          View Budgets
        </Link>
      </div>
    </div>
  );
};

const IsLoadingIsError = ({ isLoading }: { isLoading?: boolean }) => {
  return (
    <div className='grid-cols-2 gap-4 640:grid'>
      <div className='card y-center h-[94px] 640:h-[114px]'>
        <div
          className={clsx(
            'h-3 w-[60%] 640:h-5',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>
        <div
          className={clsx(
            'mt-3 h-6 w-[80%] 640:h-8',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>
      </div>

      <div className='card y-center mt-4 h-[94px] 640:mt-0 640:h-[114px]'>
        <div
          className={clsx(
            'h-3 w-[60%] 640:h-5',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>
        <div
          className={clsx(
            'mt-3 h-6 w-[80%] 640:h-8',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>
      </div>
    </div>
  );
};
