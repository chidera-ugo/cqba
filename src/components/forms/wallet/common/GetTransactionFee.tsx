import { Spinner } from 'components/svgs/dashboard/Spinner';
import { Dollar } from 'components/svgs/wallet/Icons_MakeTransfer';
import { useGetTransferFee } from 'hooks/api/wallet/useGetTransferFee';
import { useDebouncer } from 'hooks/common/useDebouncer';
import { useEffect, useState } from 'react';
import { formatAmount, sanitizeAmount } from 'utils/formatters/formatAmount';

interface Props {
  transactionType: string;
  amount: string;
  minimumAmount: number;
  getValue: (value: string) => void;
  emitIsProcessing: (processing: boolean) => void;
}

export const GetTransactionFee = ({
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
      mutate(null);
    },
    value: amount,
    dependencies: [transactionType],
  });

  const { isLoading, mutate } = useGetTransferFee({
    onSuccess(res) {
      const fee = (res.transferFee / 100).toString();
      getValue(fee);
      setFee(fee);
    },
  });

  useEffect(() => {
    emitIsProcessing(isLoading);
  }, [isLoading]);

  return (
    <div className='my-4 pl-1'>
      {!isValid ? (
        <></>
      ) : isLoading ? (
        <Spinner className={'text-primary-main'} />
      ) : (
        <div className='flex text-sm'>
          <span className='my-auto mr-2'>
            <Dollar />
          </span>
          <span className='my-auto font-medium'>
            ₦{formatAmount({ value: fee, decimalPlaces: 2 })}
          </span>
        </div>
      )}
    </div>
  );
};
