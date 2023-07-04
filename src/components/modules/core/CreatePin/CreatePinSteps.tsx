import clsx from 'clsx';
import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { CodeInput } from 'components/form-elements/CodeInput';
import { AppToast } from 'components/primary/AppToast';
import { useAppContext } from 'context/AppContext';
import { useCreatePin } from 'hooks/api/useCreatePin';
import { useHandleError } from 'hooks/api/useHandleError';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-toastify';

interface Props {
  closeModal: () => void;
}

export const CreatePinSteps = ({ closeModal }: Props) => {
  const [pins, setPins] = useState<Record<string, any>>({});

  const [mode, setMode] = useState<'new' | 'confirm'>('new');

  const { getCurrentUser } = useAppContext();

  const { handleError } = useHandleError();

  const { mutate, isLoading } = useCreatePin({
    onSuccess(res) {
      closeModal();

      toast(<AppToast>{res.message}</AppToast>, {
        type: 'success',
      });

      getCurrentUser!({});
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
        <AnimatePresence initial={false} mode='popLayout'>
          <motion.div
            initial='enter'
            animate='center'
            exit='exit'
            variants={{
              enter: {
                x: '100%',
              },
              center: {
                x: 0,
              },
              exit: {
                x: '-100%',
              },
            }}
            transition={{
              y: { type: 'spring', stiffness: 300, damping: 30 },
              duration: 0.3,
            }}
            key={mode}
            className='mx-auto w-full'
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
                      onClick={() =>
                        mutate({
                          pin: pins.new,
                        })
                      }
                      className='dark-button'
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};
