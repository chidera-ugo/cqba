import { Spinner } from 'components/svgs/dashboard/Spinner';
import { Dollar } from 'components/svgs/wallet/Icons_MakeTransfer';
import { useHandleError } from 'hooks/api/useHandleError';
import { useGetTransferFee } from 'hooks/api/wallet/useGetTransferFee';
import { useDebouncer } from 'hooks/commons/useDebouncer';
import { useEffect, useState } from 'react';
import {
  formatAmount,
  getAmountInLowestUnit,
  sanitizeAmount,
} from 'utils/formatters/formatAmount';

interface Props {
  budgetId: string;
  amount: string;
  minimumAmount: number;
  currency?: string;
  emitValue: (value: string) => void;
  emitIsProcessing: (processing: boolean) => void;
}

export const GetTransactionFee = ({
  amount,
  emitValue,
  minimumAmount,
  emitIsProcessing,
  currency,
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
  const [error, setError] = useState('');

  const { getMessage } = useHandleError();

  const { isLoading, mutate } = useGetTransferFee(
    getAmountInLowestUnit(amount),
    budgetId,
    {
      onSuccess(res) {
        const fee = (res.transferFee / 100).toString();
        emitValue(fee);
        setFee(fee);
      },
      onError: (err) => {
        setError(getMessage(err) ?? 'An error occurred');
      },
    }
  );

  useDebouncer({
    onChange() {
      emitIsProcessing(true);
      setIsProcessing(true);
      if (!isValid) emitValue('');
    },
    performDebouncedAction() {
      if (!isValid) return;

      setError('');
      mutate(null);
    },
    dependencies: [amount, budgetId],
  });

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
        <div className='flex text-sm font-medium'>
          {error ? (
            <span className={'my-auto text-red-500'}>{error}</span>
          ) : (
            <>
              <span className='my-auto mr-2'>
                <Dollar />
              </span>
              <span className='my-auto'>
                {currency}
                {formatAmount({ value: fee, decimalPlaces: 2 })}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};
