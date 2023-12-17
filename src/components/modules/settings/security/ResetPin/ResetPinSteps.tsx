import clsx from 'clsx';
import { CodeInput } from 'components/form-elements/CodeInput';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { ResetPinPasswordForm } from 'components/forms/settings/security/ResetPinPasswordForm';
import { AppToast } from 'components/primary/AppToast';
import { AnimateLayout } from 'components/animations/AnimateLayout';
import { useCompletePinReset } from 'hooks/api/settings/password_recovery/useCompletePinReset';
import { useHandleError } from 'hooks/api/useHandleError';
import { toast } from 'react-toastify';
import { useState } from 'react';

interface Props {
  closeModal: () => void;
}

export const ResetPinSteps = ({ closeModal }: Props) => {
  const [pins, setPins] = useState<{
    confirm: string;
    new: string;
  }>({
    confirm: '',
    new: '',
  });
  const [hash, setHash] = useState('');

  const [mode, setMode] = useState<
    'new_pin' | 'enter_password' | 'confirm_pin'
  >('enter_password');

  const { handleError } = useHandleError();

  const { mutate, isLoading } = useCompletePinReset({
    onSuccess() {
      toast(<AppToast>PIN reset successful</AppToast>, {
        type: 'success',
      });

      closeModal();
    },
    onError(e) {
      handleError(e);
      setPins({
        confirm: '',
        new: '',
      });
      setHash('');
      setMode('enter_password');
    },
  });

  return (
    <AnimateLayout changeTracker={mode} className='mx-auto w-full'>
      {mode === 'enter_password' ? (
        <ResetPinPasswordForm
          onSuccess={(hash) => {
            setHash(hash);
            setMode('new_pin');
          }}
        />
      ) : mode === 'new_pin' ? (
        <div className='mx-auto'>
          <p className={'text-center'}>Enter new PIN</p>

          <CodeInput
            charLimit={4}
            autoComplete='off'
            autoFocus
            type={'password'}
            submit={(pin) => {
              setPins((prev) => ({ ...prev, new: pin }));
              setMode('confirm_pin');
            }}
            name='newPin'
            className='mt-4 h-[54px] 768:h-[68px]'
          />
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (pins?.new?.length !== 4) return;

            mutate({
              hash,
              pin: pins.new,
            });
          }}
          className={'mx-auto'}
        >
          <p className={'text-center'}>Confirm your new PIN</p>
          <div className={clsx('mt-2')}>
            <CodeInput
              charLimit={4}
              autoComplete='off'
              autoFocus
              type={'password'}
              submit={(pin) => {
                if (pin !== pins.new) {
                  setPins((prev) => ({
                    new: prev.new,
                    confirm: '',
                  }));

                  setMode('new_pin');

                  toast(<AppToast>PINs do not match</AppToast>, {
                    type: 'info',
                  });
                } else {
                  setPins((prev) => ({ ...prev, confirm: pin }));
                }
              }}
              name='confirmPin'
              className='x-center h-[54px] 768:h-[68px]'
            />

            <div className={'x-center'}>
              <SubmitButton
                submitting={isLoading}
                className='primary-button mt-8 w-[140px]'
              >
                Proceed
              </SubmitButton>
            </div>
          </div>
        </form>
      )}
    </AnimateLayout>
  );
};
