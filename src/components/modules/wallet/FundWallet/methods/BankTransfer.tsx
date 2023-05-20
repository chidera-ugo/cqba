import clsx from 'clsx';
import { DisplayValue } from 'components/common/DisplayValue';
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
  if (isError || !data) return <IsLoadingIsError />;

  return (
    <>
      <div className='card p-0'>
        <div className='border-b border-neutral-200 p-8'>
          <DisplayValue value={data?.accountNumber} title='Account Number' />
        </div>

        <div className='p-8'>
          <DisplayValue value={data?.bankName} title='Bank Name' smallText />
          <DisplayValue
            className='mt-5'
            value={data?.accountName}
            title='Account Name'
            smallText
          />
        </div>
      </div>

      <button
        onClick={() =>
          copyToClipboard(data!.accountNumber, 'Copied account number')
        }
        className='secondary-button mt-7 h-12 w-full'
      >
        Copy account number
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
