import clsx from 'clsx';
import { CodeInput } from 'components/form-elements/CodeInput';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { GreenCheck } from 'components/illustrations/Success';
import { SimpleInformation } from 'components/modules/commons/SimpleInformation';
import { AppToast } from 'components/primary/AppToast';
import { AnimateLayout } from 'components/animations/AnimateLayout';
import { useChangePin } from 'hooks/api/settings/useChangePin';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  closeModal: () => void;
}

export const ChangePinSteps = ({ closeModal }: Props) => {
  const [pins, setPins] = useState<{
    current?: string;
    confirm?: string;
    new?: string;
  }>({
    current: '',
    confirm: '',
    new: '',
  });

  const [mode, setMode] = useState<'new' | 'current' | 'confirm' | 'success'>(
    'current'
  );

  const { mutate, isLoading } = useChangePin({
    onSuccess() {
      setMode('success');
    },
  });

  const canSubmit =
    pins?.confirm?.length === 4 && pins?.confirm?.length === pins?.new?.length;

  return (
    <>
      <div className={clsx('y-center smooth relative w-full overflow-hidden')}>
        <AnimateLayout
          changeTracker={mode}
          className='mx-auto min-h-[400px] w-full p-4 pb-40 pt-0 640:p-8 640:pt-0'
        >
          {mode === 'success' ? (
            <SimpleInformation
              className={'mt-20'}
              icon={<GreenCheck />}
              title={
                <span className='mx-auto block max-w-[240px] text-xl'>
                  Pin Change Successful
                </span>
              }
              actionButton={{
                text: 'Well done',
                action: () => {
                  closeModal();
                },
              }}
            />
          ) : mode === 'current' ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();

                if (pins?.current?.length !== 4) return;

                setMode('new');
              }}
            >
              <p>Enter Your Current PIN</p>

              <div className={clsx('mx-auto mt-2 max-w-[300px]')}>
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

                <div className='mt-5 text-center text-sm text-neutral-600'>
                  <Link
                    href='/settings/security?_m=reset-pin'
                    className='text-button ml-1 text-left font-medium'
                  >
                    Forgot Transaction Pin?
                  </Link>
                </div>

                <button
                  disabled={pins?.current?.length !== 4}
                  type='submit'
                  className='primary-button mt-8 px-10'
                >
                  Continue
                </button>
              </div>
            </form>
          ) : mode === 'new' ? (
            <>
              <p>Enter your new PIN</p>

              <div className={clsx('mx-auto mt-2 max-w-[300px]')}>
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
            <form
              onSubmit={(e) => {
                e.preventDefault();

                if (!canSubmit) return;

                mutate({
                  currentPin: pins?.current,
                  newPin: pins?.new,
                });
              }}
            >
              <p>Confirm your new PIN</p>

              <div className={clsx('mx-auto mt-2 max-w-[300px]')}>
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

                <SubmitButton
                  submitting={isLoading}
                  disabled={!canSubmit}
                  className='primary-button mt-8 w-[140px]'
                >
                  Proceed
                </SubmitButton>
              </div>
            </form>
          )}
        </AnimateLayout>
      </div>
    </>
  );
};
