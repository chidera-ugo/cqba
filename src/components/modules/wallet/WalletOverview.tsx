import clsx from 'clsx';
import { MoreInfo } from 'components/common/MoreInfo';
import { FundAccount } from 'components/modules/wallet/FundAccount';
import { MakeTransfer } from 'components/modules/wallet/MakeTransfer';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { formatAmount } from 'utils/helpers/formatters/formatAmount';

export const WalletOverview = () => {
  const { isLoading, isError, data } = useMakeDummyHttpRequest({
    method: 'get',
    res: {
      balance: 844082.31,
    },
  });

  if (isLoading) return <IsLoadingIsError isLoading />;
  if (isError) return <IsLoadingIsError />;

  return (
    <div className='768:card w-full gap-8 768:flex 768:w-fit'>
      <div className='y-center card w-full 768:w-auto 768:border-none 768:p-0'>
        <div className='my-auto'>
          <div className='flex text-neutral-500'>
            <div>Main balance</div>
            <MoreInfo id={`wallet_overview_balance`}>
              Your main wallet balance
            </MoreInfo>
          </div>

          <div className={clsx('mt-3 text-3xl font-semibold')}>
            <span className='mr-1.5'>NGN</span>
            {formatAmount({
              value: data?.balance,
              decimalPlaces: 2,
              kFormatter: Number(data?.balance) > 999999,
            })}
          </div>
        </div>
      </div>

      <div className='mt-5 gap-3 425:flex 768:mt-auto'>
        <FundAccount />
        <MakeTransfer />
      </div>
    </div>
  );
};

const IsLoadingIsError = ({ isLoading }: { isLoading?: boolean }) => {
  return (
    <div className='768:card w-full gap-8 768:flex 768:w-auto'>
      <div className='y-center card w-full 768:w-[300px] 768:border-none 768:p-0'>
        <div className='my-auto'>
          <div
            className={clsx(
              'h-5 w-[80%]',
              isLoading ? 'skeleton' : 'skeleton-error'
            )}
          ></div>
          <div
            className={clsx(
              'mt-7 h-8 w-full',
              isLoading ? 'skeleton' : 'skeleton-error'
            )}
          ></div>
        </div>
      </div>

      <div className='mt-5 flex gap-3'>
        <div
          className={clsx(
            'h-10 w-full rounded-full 768:w-[120px]',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>

        <div
          className={clsx(
            'h-10 w-full rounded-full 768:w-[120px]',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>
      </div>
    </div>
  );
};
