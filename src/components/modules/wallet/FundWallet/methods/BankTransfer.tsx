import clsx from 'clsx';
import { useCopyToClipboard } from 'hooks/common/useCopyToClipboard';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';

export const BankTransfer = () => {
  const { isLoading, isError, data } = useMakeDummyHttpRequest({
    method: 'get',
    res: {
      accountName: 'John Doe',
      accountNumber: '0814824844',
      bankName: 'Access Bank',
    },
  });

  const { copyToClipboard } = useCopyToClipboard();

  if (isLoading) return <IsLoadingIsError isLoading />;
  if (isError) return <IsLoadingIsError />;

  return (
    <>
      <div className='card p-0'>
        <div className='border-b border-neutral-200 p-8'>
          <p className='font-medium text-neutral-400'>Account Number</p>
          <div className='mt-2 text-3xl font-semibold text-neutral-980'>
            {data?.accountNumber}
          </div>
        </div>

        <div className='p-8'>
          <p className='font-medium text-neutral-400'>Bank Name</p>
          <div className='text-lg font-semibold text-neutral-980'>
            {data?.bankName}
          </div>

          <p className='mt-5 font-medium text-neutral-400'>Account Name</p>
          <div className='text-lg font-semibold text-neutral-980'>
            {data?.accountName}
          </div>
        </div>
      </div>

      <button
        onClick={() =>
          copyToClipboard(data!.accountNumber, 'Copied account number')
        }
        className='secondary-button mt-7 h-12 w-full'
      >
        Copy account details
      </button>
    </>
  );
};

const IsLoadingIsError = ({ isLoading }: { isLoading?: boolean }) => {
  return (
    <div className='card p-0'>
      <div className='border-b border-neutral-200 p-7'>
        <div
          className={clsx(
            'h-5 w-[40%]',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>
        <div
          className={clsx(
            'mt-4 h-10 w-[80%]',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>
      </div>

      <div className='p-7'>
        <div
          className={clsx(
            'h-5 w-[40%]',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>
        <div
          className={clsx(
            'mt-4 h-6 w-[70%]',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>

        <div
          className={clsx(
            'mt-10 h-5 w-[40%]',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>
        <div
          className={clsx(
            'mt-4 h-6 w-[70%]',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>
      </div>
    </div>
  );
};
