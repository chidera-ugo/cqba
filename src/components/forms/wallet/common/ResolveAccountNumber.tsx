import { Spinner } from 'components/svgs/dashboard/Spinner';
import { House } from 'components/svgs/wallet/Icons_MakeTransfer';
import { useResolveAccountNumber } from 'hooks/api/wallet/useResolveAccountNumber';
import { useEffect, useState } from 'react';

interface Props {
  bankCode: string;
  accountNumber: string;
  getValue: (value: string) => void;
  emitIsProcessing: (processing: boolean) => void;
}

export const ResolveAccountNumber = ({
  bankCode,
  accountNumber,
  getValue,
  emitIsProcessing,
}: Props) => {
  const [accountName, setAccountName] = useState('');
  const resolvable = !!bankCode && accountNumber?.length === 10;

  const { isLoading, mutate } = useResolveAccountNumber({
    onSuccess(res) {
      getValue(res.accountName);
      setAccountName(res.accountName);
    },
  });

  useEffect(() => {
    emitIsProcessing(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (!resolvable) {
      getValue('');
      return;
    }

    mutate({
      bankCode,
      accountNumber,
    });
  }, [bankCode, accountNumber]);

  return (
    <div className='my-4 pl-1'>
      {!resolvable ? (
        <></>
      ) : isLoading ? (
        <Spinner className={'text-primary-main'} />
      ) : (
        <div className='flex text-sm'>
          <span className='my-auto mr-2'>
            <House />
          </span>
          <span className='my-auto font-medium'>{accountName}</span>
        </div>
      )}
    </div>
  );
};
