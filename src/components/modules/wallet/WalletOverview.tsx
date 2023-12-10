import clsx from 'clsx';
import { DisplayValue } from 'components/commons/DisplayValue';
import { useAppContext } from 'context/AppContext';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import Link from 'next/link';

export const WalletOverview = () => {
  const { user } = useAppContext().state;

  const { isLoading, isError, primaryWallet } = useManageWallets();

  if (isLoading) return <IsLoadingIsError isLoading />;
  if (isError) return <IsLoadingIsError />;

  return (
    <div className='grid-cols-2 gap-4 640:grid'>
      {user?.role === 'owner' && (
        <div className='card'>
          <DisplayValue
            value={!primaryWallet ? 0 : primaryWallet.availableBalance}
            isAmount
            title='Account Balance'
            moreInfo='Your main wallet balance'
          />
        </div>
      )}

      <div className='card relative mt-4 640:mt-0'>
        <DisplayValue
          value={
            !primaryWallet
              ? 0
              : primaryWallet.balance - primaryWallet.availableBalance
          }
          isAmount
          title='Budget Balance'
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
      <div className='card y-center h-[76px] 640:h-[106px]'>
        <div
          className={clsx(
            'h-3 w-[60%] 640:h-5',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>
        <div
          className={clsx(
            'mt-2 h-6 w-[80%] 640:h-8',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>
      </div>

      <div className='card y-center mt-4 h-[76px] 640:mt-0 640:h-[106px]'>
        <div
          className={clsx(
            'h-3 w-[60%] 640:h-5',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>
        <div
          className={clsx(
            'mt-2 h-6 w-[80%] 640:h-8',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>
      </div>
    </div>
  );
};
