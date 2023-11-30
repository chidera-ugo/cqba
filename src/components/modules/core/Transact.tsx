import { AuthorizeActionWithPin } from 'components/core/AuthorizeActionWithPin';
import { TransactProps } from 'hooks/dashboard/core/useTransact';

type Props = TransactProps & {
  finish: () => void;
  authorize: (pin: string, onError: () => void) => void;
  processing: boolean;
};

export const Transact = ({
  mode,
  processing,
  terminate,
  finish,
  authorize,
}: Props) => {
  return (
    <AuthorizeActionWithPin
      mode={mode}
      show={!!mode}
      close={terminate}
      processing={processing}
      title={mode !== 'success' ? 'Approve Transaction' : ''}
      finish={() => {
        terminate();
        finish();
      }}
      successTitle={'Transfer Successful'}
      successMessage={`You can add money to your wallet by different methods. Choose what suites you.`}
      actionMessage={'Send Money'}
      submit={(pin, errorCb) => authorize(pin, errorCb)}
    />
  );
};
