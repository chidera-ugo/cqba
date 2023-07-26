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
  if (isError || !data) return <IsLoadingIsError />;

  const accountDetails = [
    {
      name: 'Account Name',
      value: data.accountName,
    },
    {
      name: 'Account Number',
      value: data.accountNumber,
      canCopy: true,
    },
    {
      name: 'Bank Name',
      value: data.bankName,
    },
  ];

  return (
    <>
      {!data?.accountNumber ? null : (
        <div className='w-full rounded-xl border border-neutral-300 bg-neutral-50 p-5'>
          {accountDetails.map(({ name, canCopy, value }) => {
            return (
              <div
                key={name}
                className={clsx('x-between gap-4 py-2')}
                onClick={
                  !canCopy
                    ? undefined
                    : () => copyToClipboard(value, `Copied ${name}`)
                }
              >
                <span className='my-auto flex-shrink-0 text-sm text-neutral-400'>
                  {name}
                </span>
                <span
                  className={clsx(
                    'text-right font-medium text-neutral-1000',
                    canCopy && 'cursor-pointer hover:underline'
                  )}
                >
                  {value ? value : '---'}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

const IsLoadingIsError = ({ isLoading }: { isLoading?: boolean }) => {
  return (
    <div className='card'>
      <div className='x-between'>
        <div
          className={clsx(
            'my-auto h-5 w-[30%]',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>
        <div
          className={clsx(
            'my-auto h-6 w-[40%]',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>
      </div>

      <div className='x-between mt-6'>
        <div
          className={clsx(
            'my-auto h-5 w-[30%]',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>
        <div
          className={clsx(
            'my-auto h-6 w-[40%]',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>
      </div>

      <div className='x-between mt-6'>
        <div
          className={clsx(
            'my-auto h-5 w-[30%]',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>
        <div
          className={clsx(
            'my-auto h-6 w-[40%]',
            isLoading ? 'skeleton' : 'skeleton-error'
          )}
        ></div>
      </div>
    </div>
  );
};
