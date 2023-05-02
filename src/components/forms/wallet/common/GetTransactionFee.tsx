import { Spinner } from 'components/svgs/dashboard/Spinner';
import { Dollar } from 'components/svgs/wallet/Icons_MakeTransfer';
import { useDebouncer } from 'hooks/common/useDebouncer';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { useEffect, useState } from 'react';
import {
  formatAmount,
  sanitizeAmount,
} from 'utils/helpers/formatters/formatAmount';

interface Props {
  transactionType: string;
  amount: string;
  minimumAmount: number;
  getValue: (value: string) => void;
  emitIsProcessing: (processing: boolean) => void;
}

const GetTransactionFeeContent = ({
  transactionType,
  amount,
  getValue,
  minimumAmount,
  emitIsProcessing,
}: Props) => {
  const sanitizedAmount = sanitizeAmount({
    value: amount,
    returnTrueAmount: true,
  });

  const isValid =
    !!transactionType && !!amount && Number(sanitizedAmount) > minimumAmount;

  const [fee, setFee] = useState('');

  useDebouncer({
    onChange() {
      if (!isValid) getValue('');
      emitIsProcessing(true);
    },
    performDebouncedAction() {
      mutate({
        transactionType,
        amount: sanitizedAmount,
      });
    },
    dependencies: [transactionType, amount],
  });

  const { isLoading, mutate } = useMakeDummyHttpRequest({
    onSuccess() {
      const fee = '50';
      getValue(fee);
      setFee(fee);
    },
  });

  useEffect(() => {
    emitIsProcessing(isLoading);
  }, [isLoading]);

  if (!isValid) return <></>;
  if (isLoading) return <Spinner />;

  return (
    <div className='flex text-sm'>
      <span className='my-auto mr-2'>
        <Dollar />
      </span>
      <span className='my-auto font-medium'>
        ₦{formatAmount({ value: fee, decimalPlaces: 2 })}
      </span>
    </div>
  );
};

export const GetTransactionFee = (props: Props) => {
  return (
    <div className='my-4 pl-1'>
      <GetTransactionFeeContent {...props} />
    </div>
  );
};
