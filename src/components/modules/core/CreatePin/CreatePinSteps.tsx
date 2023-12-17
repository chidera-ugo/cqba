import clsx from 'clsx';
import { CodeInput } from 'components/form-elements/CodeInput';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { AppToast } from 'components/primary/AppToast';
import { AnimateLayout } from 'components/animations/AnimateLayout';
import { useAppContext } from 'context/AppContext';
import { useCreatePin } from 'hooks/api/settings/useCreatePin';
import { useHandleError } from 'hooks/api/useHandleError';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  closeModal: () => void;
}

export const CreatePinSteps = ({ closeModal }: Props) => {
  const [pins, setPins] = useState<Record<string, any>>({});

  const [mode, setMode] = useState<'new' | 'confirm'>('new');

  const { getCurrentUser, dispatch } = useAppContext();

  const { handleError } = useHandleError();

  const { mutate, isLoading } = useCreatePin({
    onSuccess() {
      dispatch({ type: 'update_has_set_pin', payload: true });

      closeModal();

      getCurrentUser!(null);
    },
    onError(e) {
      handleError(e);
      setPins({});
      setMode('new');
    },
  });

  return (
    <div className={clsx('y-center smooth relative w-full overflow-hidden')}>
      <AnimateLayout
        changeTracker={mode}
        className='mx-auto min-h-[400px] w-full'
      >
        {mode === 'new' ? (
          <>
            <p className={'text-center'}>Enter your new PIN</p>
            <div className={clsx('mx-auto max-w-[300px] pb-10')}>
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

              if (isLoading) return;

              if (pins?.confirm?.length !== 4)
                return toast(<AppToast>Confirm new PIN</AppToast>, {
                  type: 'info',
                });

              mutate({
                pin: pins.new,
              });
            }}
          >
            <p className={'text-center'}>Confirm your new PIN</p>
            <div className={clsx('mx-auto max-w-[300px] pb-10')}>
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

              <div className='x-center mt-5'>
                <SubmitButton
                  submitting={isLoading}
                  type='submit'
                  className='primary-button w-[100px]'
                >
                  Proceed
                </SubmitButton>
              </div>
            </div>
          </form>
        )}
      </AnimateLayout>
    </div>
  );
};
