import clsx from 'clsx';
import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { CodeInput } from 'components/form-elements/CodeInput';
import { ResetPinPasswordForm } from 'components/forms/settings/security/ResetPinPasswordForm';
import { VerifyResetPinPassword } from 'components/modules/settings/security/ResetPin/VerifyResetPinPassword';
import { AppToast } from 'components/primary/AppToast';
import { AnimateLayout } from 'components/transition/AnimateLayout';
import { useHandleError } from 'hooks/api/useHandleError';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  closeModal: () => void;
}

export const ResetPinSteps = ({ closeModal }: Props) => {
  const [pins, setPins] = useState<Record<string, any>>({});

  const [otp, setOtp] = useState('');

  const [password, setPassword] = useState('');

  const [mode, setMode] = useState<'new' | 'password' | 'confirm' | 'otp'>(
    'password'
  );

  const { handleError } = useHandleError();

  const { mutate, isLoading } = useMakeDummyHttpRequest({
    onSuccess() {
      toast(<AppToast>Successfully reset PIN</AppToast>, {
        type: 'success',
      });

      closeModal();
    },
    onError(e) {
      handleError(e);
      setPins({});
      setOtp('');
      setMode('password');
    },
  });

  return (
    <>
      <FullScreenLoader show={isLoading} />

      <div className={clsx('y-center smooth relative w-full overflow-hidden')}>
        <AnimateLayout changeTracker={mode} className='mx-auto w-full'>
          {mode === 'password' ? (
            <>
              <p>Enter your account password</p>

              <div className={clsx('mx-auto mt-8 max-w-[420px]')}>
                <ResetPinPasswordForm
                  onSuccess={(password) => {
                    setPassword(password);
                    setMode('otp');
                  }}
                />
              </div>
            </>
          ) : mode === 'otp' ? (
            <>
              <p className={'leading-2'}>
                Enter the OTP that was sent to your phone number or email
              </p>
              <div className='x-center mt-2'>
                <VerifyResetPinPassword
                  password={password}
                  next={(otp) => {
                    setOtp(otp);
                    setMode('new');
                  }}
                />
              </div>
            </>
          ) : mode === 'new' ? (
            <>
              <>
                <p>Enter your new PIN</p>
                <div className={clsx('mx-auto mt-4 max-w-[300px]')}>
                  <CodeInput
                    charLimit={4}
                    autoComplete='off'
                    autoFocus
                    type={'password'}
                    submit={(pin) => {
                      setPins((prev) => ({ ...prev, new: pin }));
                      setMode('confirm');
                    }}
                    name='newPin'
                    className='x-center h-[54px] 768:h-[68px]'
                  />
                </div>
              </>
            </>
          ) : (
            <>
              <p>Confirm your new PIN</p>
              <div className={clsx('mx-auto mt-4 max-w-[300px]')}>
                <CodeInput
                  charLimit={4}
                  autoComplete='off'
                  autoFocus
                  type={'password'}
                  submit={(pin) => {
                    if (pin !== pins.new) {
                      setPins((prev) => ({
                        password: prev.password,
                      }));

                      setMode('new');

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

                <button
                  type='button'
                  onClick={() =>
                    mutate({
                      newPin: pins.new,
                      otp,
                    })
                  }
                  className='dark-button mt-5'
                >
                  Proceed
                </button>
              </div>
            </>
          )}
        </AnimateLayout>
      </div>
    </>
  );
};
