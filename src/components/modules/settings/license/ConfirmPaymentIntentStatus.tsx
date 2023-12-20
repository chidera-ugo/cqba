import { Cancel } from 'components/illustrations/Cancel';
import { SimpleInformation } from 'components/modules/commons/SimpleInformation';
import { Spinner } from 'components/svgs/dashboard/Spinner';
import { useCheckPaymentIntentStatus } from 'hooks/api/subscriptions/useCheckPaymentIntentStatus';
import { useEffect, useState } from 'react';

interface Props {
  intentId: string;
  onError: () => void;
  onSuccess: () => void;
}

export const ConfirmPaymentIntentStatus = ({
  intentId,
  onError,
  onSuccess,
}: Props) => {
  const { data, isError } = useCheckPaymentIntentStatus(intentId);

  const [_isError, setIsError] = useState(false);

  useEffect(() => {
    if (!data) return;

    if (data.status === 'failed') return setIsError(true);
    if (data.status === 'completed') return onSuccess();
  }, [data]);

  if (isError || _isError)
    return (
      <SimpleInformation
        className={'mt-20'}
        icon={<Cancel />}
        title={
          <span className='mx-auto block max-w-[240px] text-xl'>
            Confirmation Failed
          </span>
        }
        description={'We failed to confirm your payment status'}
        actionButton={{
          action: onError,
          text: 'Continue',
        }}
      />
    );

  return (
    <SimpleInformation
      className={'mt-20'}
      icon={<Spinner className={'h-8 w-8 text-primary-main'} />}
      title={
        <span className='mx-auto block max-w-[240px] text-xl'>
          Confirming Payment
        </span>
      }
      description={'Please wait while we confirm your payment status'}
    />
  );
};
