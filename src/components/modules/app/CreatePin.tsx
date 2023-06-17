import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { useState } from 'react';
import { useEffect } from 'react';
import clsx from 'clsx';
import { useResetter } from 'hooks/common/useResetter';
import { CodeInput } from 'components/form-elements/CodeInput';
import { toast } from 'react-toastify';
import { AppToast } from 'components/primary/AppToast';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { FullScreenLoader } from 'components/common/FullScreenLoader';

export const CreatePin = () => {
  const [showModal, setShowModal] = useState(false);

  const { mutate, isLoading } = useMakeDummyHttpRequest({
    onSuccess() {
      toast(<AppToast>Successfully created transaction PIN</AppToast>, {
        type: 'success',
      });
      close();
    },
    onError() {
      setShowModal(true);
      toast(<AppToast>Failed to create PIN, try again</AppToast>, {
        type: 'error',
      });
    },
  });

  function close() {
    setShowModal(false);
  }

  return (
    <>
      <FullScreenLoader show={isLoading} />

      <RightModalWrapper
        show={showModal}
        title='Create Transaction PIN'
        closeModal={close}
      >
        <CreatePinContent
          {...{
            onSuccess(pin) {
              mutate({ pin });
              setShowModal(false);
            },
          }}
        />
      </RightModalWrapper>
    </>
  );
};

type Props = {
  className?: string;
  onSuccess: (pin: string) => void;
};

export const CreatePinContent = ({ onSuccess }: Props) => {
  const [clearCodeInput, setClearCodeInput] = useResetter();
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  function reset() {
    setClearCodeInput(true);
    setPin('');
    setConfirmPin('');
  }

  useEffect(() => {
    if (confirmPin) {
      if (pin !== confirmPin) {
        document.getElementById('new-pinchar0')?.focus();
        reset();
        toast(<AppToast>PINs do not match</AppToast>, { type: 'error' });
      } else {
        onSuccess(pin);
      }
    }
  }, [confirmPin]);

  return (
    <div className={clsx('mx-auto max-w-[300px]')}>
      <CodeInput
        charLimit={4}
        autoComplete='off'
        label='New Pin'
        autoFocus
        type={'password'}
        clear={clearCodeInput}
        submit={(code) => {
          setPin(code);
          document.getElementById('confirm-new-pinchar0')?.focus();
        }}
        name='code'
        className='h-[54px] 768:h-[68px]'
      />

      <div className='mt-5'>
        <CodeInput
          charLimit={4}
          donotFocusOnClear
          autoComplete='off'
          label='Confirm New Pin'
          type={'password'}
          clear={clearCodeInput}
          submit={(code) => {
            setConfirmPin(code);
          }}
          name='code'
          className='h-[54px] 768:h-[68px]'
        />
      </div>
    </div>
  );
};
