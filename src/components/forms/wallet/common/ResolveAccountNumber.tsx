import { Spinner } from 'components/svgs/dashboard/Spinner';
import { House } from 'components/svgs/wallet/Icons_MakeTransfer';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { useEffect, useState } from 'react';

interface Props {
  bankCode: string;
  accountNumber: string;
  getValue: (value: string) => void;
  emitIsProcessing: (processing: boolean) => void;
}

const ResolveAccountNumberContent = ({
  bankCode,
  accountNumber,
  getValue,
  emitIsProcessing,
}: Props) => {
  const [accountName, setAccountName] = useState('');
  const resolvable = !!bankCode && accountNumber?.length === 10;

  const { isLoading, mutate } = useMakeDummyHttpRequest({
    onSuccess() {
      const val = 'John Doe';
      getValue(val);
      setAccountName(val);
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

  if (!resolvable) return <></>;
  if (isLoading) return <Spinner />;

  return (
    <div className='flex text-sm'>
      <span className='my-auto mr-2'>
        <House />
      </span>
      <span className='my-auto font-medium'>{accountName}</span>
    </div>
  );
};

export const ResolveAccountNumber = (props: Props) => {
  return (
    <div className='my-4 pl-1'>
      <ResolveAccountNumberContent {...props} />
    </div>
  );
};
