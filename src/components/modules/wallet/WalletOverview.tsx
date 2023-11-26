import clsx from 'clsx';
import { DisplayValue } from 'components/common/DisplayValue';
import { FundWallet } from 'components/modules/wallet/FundWallet';
import { MakeTransfer } from 'components/modules/wallet/MakeTransfer';
import { useManageWallets } from 'hooks/wallet/useManageWallets';

export const WalletOverview = () => {
  const { isLoading, isError, primaryWallet } = useManageWallets();

  if (isLoading) return <IsLoadingIsError isLoading />;
  if (isError || !primaryWallet) return <IsLoadingIsError />;

  return (
    <div className='w-full justify-between gap-8 768:flex'>
      <div className='y-center w-full 768:w-auto 768:p-0'>
        <div className='my-auto'>
          <DisplayValue
            value={primaryWallet.availableBalance}
            isAmount
            title='Main balance'
            moreInfo='Your main wallet balance'
          />
        </div>
      </div>

      <div className='mt-5 gap-3 425:flex 768:mt-auto'>
        <FundWallet />
        <MakeTransfer />
      </div>
    </div>
  );
};

const IsLoadingIsError = ({ isLoading }: { isLoading?: boolean }) => {
  return (
    <div className='x-between w-full gap-8 768:flex'>
      <div className='y-center card w-full 768:w-[240px] 768:border-none 768:p-0'>
        <div className='my-auto'>
          <div
            className={clsx(
              'h-5 w-[80%]',
              isLoading ? 'skeleton' : 'skeleton-error'
            )}
          ></div>
          <div
            className={clsx(
              'mt-2 h-8 w-full',
              isLoading ? 'skeleton' : 'skeleton-error'
            )}
          ></div>
        </div>
      </div>

      <div className='mt-5 gap-3 425:flex 768:mt-auto'>
        <div
          className={clsx(
            'h-10 w-full rounded-full 768:w-[120px]',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>

        <div
          className={clsx(
            'mt-3 h-10 w-full rounded-full 425:mt-0 768:w-[120px]',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>
      </div>
    </div>
  );
};
