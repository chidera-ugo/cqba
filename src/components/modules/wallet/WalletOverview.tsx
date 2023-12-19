import clsx from 'clsx';
import { SummaryWithVariance } from 'components/modules/overview/Overview/SummaryWithVariance';
import { useGetBudgetBalances } from 'hooks/api/wallet/useGetBudgetBalances';
import { useGetWalletBalances } from 'hooks/api/wallet/useGetWalletBalances';
import { useIsVerified } from 'hooks/dashboard/kyc/useIsVerified';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import Link from 'next/link';

export const WalletOverview = ({ isOwner }: { isOwner: boolean }) => {
  const { isVerified } = useIsVerified();

  const { isLoading: l, isError: e, primaryWallet } = useManageWallets();

  const { isLoading: _l, isError: _e, data } = useGetWalletBalances();

  const {
    isLoading: __l,
    isError: __e,
    data: budgetBalances,
  } = useGetBudgetBalances({
    enabled: !isOwner && isVerified,
  });

  const isLoading = isOwner ? l || _l : l || __l;
  const isError = isOwner ? e || _e : e || __e;

  console.log(budgetBalances);

  if (isLoading) return <IsLoadingIsError isOwner={isOwner} isLoading />;
  if (isError) return <IsLoadingIsError isOwner={isOwner} />;

  return (
    <div className='grid-cols-2 gap-4 640:grid'>
      {isOwner && (
        <div className='card y-center h-[94px] 640:h-[114px]'>
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

      <div className='card y-center relative mt-4 h-[94px] 640:mt-0 640:h-[114px]'>
        <SummaryWithVariance
          value={
            !primaryWallet
              ? 0
              : (isOwner
                  ? data?.budget?.find(
                      ({ currency }) => currency === primaryWallet?.currency
                    )?.balance ?? 0
                  : budgetBalances?.find(
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

const IsLoadingIsError = ({
  isLoading,
  isOwner,
}: {
  isLoading?: boolean;
  isOwner: boolean;
}) => {
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

      {isOwner && (
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
      )}
    </div>
  );
};
