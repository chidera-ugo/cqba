import clsx from 'clsx';
import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { CodeInput } from 'components/form-elements/CodeInput';
import { AppToast } from 'components/primary/AppToast';
import { AnimateLayout } from 'components/transition/AnimateLayout';
import { useHandleError } from 'hooks/api/useHandleError';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  closeModal: () => void;
}

export const ChangePinSteps = ({ closeModal }: Props) => {
  const [pins, setPins] = useState<Record<string, any>>({});

  const [mode, setMode] = useState<'new' | 'current' | 'confirm'>('current');

  const { handleError } = useHandleError();

  const { mutate, isLoading } = useMakeDummyHttpRequest({
    onSuccess() {
      toast(<AppToast>Successfully changed PIN</AppToast>, {
        type: 'success',
      });

      closeModal();
    },
    onError(e) {
      handleError(e);
      setPins({});
      setMode('current');
    },
  });

  return (
    <>
      <FullScreenLoader show={isLoading} />

      <div className={clsx('y-center smooth relative w-full overflow-hidden')}>
        <AnimateLayout changeTracker={mode} className='mx-auto w-full pb-40'>
          {mode === 'current' ? (
            <>
              <p>Enter Your Current PIN</p>

              <div className={clsx('mx-auto mt-4 max-w-[300px]')}>
                <CodeInput
                  charLimit={4}
                  autoComplete='off'
                  autoFocus
                  type={'password'}
                  submit={(pin) => {
                    setPins((prev) => ({ ...prev, current: pin }));
                  }}
                  name='currentPin'
                  className='x-center h-[54px] 768:h-[68px]'
                />

                <button
                  type='button'
                  onClick={() => setMode('new')}
                  className='dark-button mt-5 px-10'
                >
                  Continue
                </button>

                <div className='mt-5 text-center text-sm text-neutral-600'>
                  <Link
                    href='/settings/security?_m=reset-pin'
                    className='text-button ml-1 text-left font-medium'
                  >
                    Forgot Transaction Pin?
                  </Link>
                </div>
              </div>
            </>
          ) : mode === 'new' ? (
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
                        current: prev.current,
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
                      oldPin: pins.current,
                      newPin: pins.new,
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
