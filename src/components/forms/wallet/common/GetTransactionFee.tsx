import { Spinner } from 'components/svgs/dashboard/Spinner';
import { Dollar } from 'components/svgs/wallet/Icons_MakeTransfer';
import { useGetTransferFee } from 'hooks/api/wallet/useGetTransferFee';
import { useDebouncer } from 'hooks/commons/useDebouncer';
import { useEffect, useState } from 'react';
import { formatAmount, sanitizeAmount } from 'utils/formatters/formatAmount';

interface Props {
  budgetId: string;
  amount: string;
  minimumAmount: number;
  emitValue: (value: string) => void;
  emitIsProcessing: (processing: boolean) => void;
}

export const GetTransactionFee = ({
  amount,
  emitValue,
  minimumAmount,
  emitIsProcessing,
  budgetId,
}: Props) => {
  const sanitizedAmount = sanitizeAmount({
    value: amount,
    returnTrueAmount: true,
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const isValid =
    !!budgetId && !!amount && Number(sanitizedAmount) > minimumAmount;

  const [fee, setFee] = useState('');

  useDebouncer({
    onChange() {
      emitIsProcessing(true);
      setIsProcessing(true);
      if (!isValid) emitValue('');
    },
    performDebouncedAction() {
      if (!isValid) return;

      mutate(null);
    },
    dependencies: [amount, budgetId],
  });

  const { isLoading, mutate } = useGetTransferFee(
    Number(
      sanitizeAmount({
        value: amount,
        returnTrueAmount: true,
      })
    ) * 100,
    budgetId,
    {
      onSuccess(res) {
        const fee = (res.transferFee / 100).toString();
        emitValue(fee);
        setFee(fee);
      },
      onError: () => null,
    }
  );

  useEffect(() => {
    emitIsProcessing(isLoading);
    setIsProcessing(isLoading);
  }, [isLoading]);

  return (
    <div className='my-4 pl-1'>
      {!isValid ? (
        <></>
      ) : isLoading || isProcessing ? (
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
