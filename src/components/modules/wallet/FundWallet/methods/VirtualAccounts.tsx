import clsx from 'clsx';
import { IsEmpty } from 'components/data-states/IsEmpty';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { useCopyToClipboard } from 'hooks/commons/useCopyToClipboard';
import { useManageWallets } from 'hooks/wallet/useManageWallets';

export const VirtualAccounts = () => {
  const { isLoading, isError, primaryWallet } = useManageWallets();

  const { copyToClipboard } = useCopyToClipboard();

  if (isLoading) return <IsLoading />;
  if (isError) return <IsError description={'Failed to get your accounts'} />;

  if (!primaryWallet) return <IsEmpty text={'No virtual acccounts yet'} />;

  return (
    <>
      {primaryWallet.virtualAccounts.map(
        ({ accountNumber, bankName, name }) => {
          const accountDetails = [
            {
              name: 'Bank Name',
              value: bankName,
            },
            {
              name: 'Account Number',
              value: accountNumber,
              canCopy: true,
            },
            {
              name: 'Account Name',
              value: name,
            },
          ];

          return (
            <div key={accountNumber}>
              {!accountNumber ? null : (
                <div className='w-full rounded-xl border border-neutral-310 p-5'>
                  {accountDetails.map(({ name, canCopy, value }) => {
                    return (
                      <div
                        key={name}
                        className={clsx('py-2')}
                        onClick={
                          !canCopy
                            ? undefined
                            : () => copyToClipboard(value, `Copied ${name}`)
                        }
                      >
                        <div className='my-auto flex-shrink-0 text-sm text-neutral-400'>
                          {name}
                        </div>

                        <div
                          className={clsx(
                            'relative mt-1 font-semibold text-neutral-1000',
                            canCopy && 'cursor-pointer text-3xl'
                          )}
                        >
                          {value ? value : '---'}

                          {canCopy && (
                            <div
                              className={'pill_gray absolute right-0 bottom-1'}
                            >
                              Copy
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }
      )}
    </>
  );
};
