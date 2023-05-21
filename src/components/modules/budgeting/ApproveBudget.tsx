import { CodeInput } from 'components/form-elements/CodeInput';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { AppToast } from 'components/primary/AppToast';
import { useHandleError } from 'hooks/api/useHandleError';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { useResetter } from 'hooks/common/useResetter';
import { useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
  close: () => void;
};

export const ApproveBudget = ({ close }: Props) => {
  const [clearCodeInput, setClearCodeInput] = useResetter();
  const [pin, setPin] = useState('');
  const { handleError } = useHandleError();

  const { isLoading, mutate } = useMakeDummyHttpRequest({
    onSuccess() {
      close();
      toast(<AppToast>Approved budget successfully</AppToast>, {
        type: 'success',
      });
    },
    onError() {
      setClearCodeInput(true);
      handleError({ message: 'Failed to approve budget' });
    },
  });

  return (
    <>
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
        <SubmitButton
          onClick={() =>
            mutate({
              pin,
            })
          }
          type='button'
          submitting={isLoading}
          disabled={pin.length !== 4}
          className='dark-button mt-4 min-w-[200px]'
        >
          Approve
        </SubmitButton>
      </div>
    </>
  );
};
