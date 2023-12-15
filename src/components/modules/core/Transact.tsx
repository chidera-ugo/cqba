import { AuthorizeActionWithPin } from 'components/core/AuthorizeActionWithPin';
import { Cancel } from 'components/illustrations/Cancel';
import { TransactProps } from 'hooks/dashboard/core/useTransact';

type Props = TransactProps & {
  finish: () => void;
  authorize: (pin: string, onError: () => void) => void;
  processing: boolean;
};

export const Transact = ({
  mode,
  processing,
  errorMessage,
  terminate,
  finish,
  authorize,
}: Props) => {
  return (
    <AuthorizeActionWithPin
      hasResponse={mode !== 'authorize'}
      show={!!mode}
      close={terminate}
      processing={processing}
      modalTitle={mode === 'authorize' ? 'Approve Transaction' : ''}
      finish={() => {
        terminate();
        finish();
      }}
      icon={mode === 'failed' ? <Cancel /> : undefined}
      finishButtonText={mode === 'failed' ? 'Continue' : undefined}
      responseTitle={
        mode === 'success' ? 'Transfer Successful' : 'Transfer Pending'
      }
      responseMessage={
        mode === 'success'
          ? `You can add money to your wallet by different methods. Choose what suites you.`
          : errorMessage
      }
      authorizeButtonText={'Send Money'}
      submit={(pin, errorCb) => authorize(pin, errorCb)}
    />
  );
};
