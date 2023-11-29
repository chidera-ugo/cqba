import clsx from 'clsx';
import { FullScreenLoader } from 'components/commons/FullScreenLoader';
import { CodeInput } from 'components/form-elements/CodeInput';
import { AppToast } from 'components/primary/AppToast';
import { AnimateLayout } from 'components/transition/AnimateLayout';
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
    onSuccess(res) {
      dispatch({ type: 'update_has_set_pin', payload: true });

      closeModal();

      toast(<AppToast>{res.message}</AppToast>, {
        type: 'success',
      });

      getCurrentUser!(null);
    },
    onError(e) {
      handleError(e);
      setPins({});
      setMode('new');
    },
  });

  return (
    <>
      <FullScreenLoader show={isLoading} />

      <div className={clsx('y-center smooth relative w-full overflow-hidden')}>
        <AnimateLayout changeTracker={mode} className='mx-auto w-full'>
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
            <>
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
                  <button
                    type='button'
                    onClick={() => {
                      if (pins?.confirm?.length !== 4)
                        return toast(<AppToast>Confirm new PIN</AppToast>, {
                          type: 'info',
                        });

                      mutate({
                        pin: pins.new,
                      });
                    }}
                    className='dark-button'
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </>
          )}
        </AnimateLayout>
      </div>
    </>
  );
};
