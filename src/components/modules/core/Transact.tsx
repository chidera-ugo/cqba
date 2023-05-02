import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { CodeInput } from 'components/form-elements/CodeInput';
import { SimpleInformation } from 'components/modules/common/SimpleInformation';
import { useHandleError } from 'hooks/api/useHandleError';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { useResetter } from 'hooks/common/useResetter';
import { TransactProps } from 'hooks/dashboard/core/useTransact';
import { useState } from 'react';

type Props = TransactProps & {
  finish: () => void;
  hideModalTitle: () => void;
};

export const Transact = ({
  mode,
  hideModalTitle,
  setMode,
  transactionType,
  finish,
}: Props) => {
  const [clearCodeInput, setClearCodeInput] = useResetter();
  const [pin, setPin] = useState('');
  const { handleError } = useHandleError();

  const { isLoading, mutate } = useMakeDummyHttpRequest({
    onSuccess() {
      hideModalTitle();
      setMode('success');
    },
    onError() {
      setClearCodeInput(true);
      handleError({ message: 'Incorrect transaction PIN' });
    },
  });

  function getSuccessTitle() {
    switch (transactionType) {
      default:
        return 'Transfer Successful';
    }
  }

  if (mode === 'success')
    return (
      <div className='y-center py-20'>
        <SimpleInformation
          title={<span className='text-xl'>{getSuccessTitle()}</span>}
          description={
            <div className='mx-auto mt-1 max-w-[400px]'>
              You can add money to your wallet by different methods. Choose what
              suites you.
            </div>
          }
          icon='success'
          actionButton={{
            text: 'Thanks chief',
            action() {
              finish();
            },
          }}
        />
      </div>
    );

  return (
    <>
      <FullScreenLoader show={isLoading} />

      <div className='x-center mt-8'>
        <CodeInput
          charLimit={4}
          autoComplete='off'
          label='Transaction Pin'
          autoFocus
          type={'password'}
          clear={clearCodeInput}
          submit={(code) => {
            setPin(code);
          }}
          name='code'
          className='h-[54px] 768:h-[68px]'
        />
      </div>

      <div className='x-center mt-4'>
        <button
          onClick={() =>
            mutate({
              pin,
            })
          }
          disabled={pin.length !== 4}
          className='dark-button mt-4'
        >
          Send Money
        </button>
      </div>
    </>
  );
};
