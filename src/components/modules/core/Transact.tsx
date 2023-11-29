import { CodeInput } from 'components/form-elements/CodeInput';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { GreenCheck } from 'components/illustrations/Success';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { SimpleInformation } from 'components/modules/commons/SimpleInformation';
import { AppToast } from 'components/primary/AppToast';
import { AnimateLayout } from 'components/transition/AnimateLayout';
import { useResetter } from 'hooks/commons/useResetter';
import { TransactProps } from 'hooks/dashboard/core/useTransact';
import { useState } from 'react';
import { toast } from 'react-toastify';

type Props = TransactProps & {
  finish: () => void;
  authorize: (pin: string, onError: () => void) => void;
  processing?: boolean;
};

export const Transact = ({
  mode,
  processing,
  terminate,
  finish,
  authorize,
}: Props) => {
  const [pin, setPin] = useState('');
  const [clearCodeInput, setClearCodeInput] = useResetter();

  function handleSubmit() {
    if (!pin)
      return toast(<AppToast>Please provide your PIN</AppToast>, {
        type: 'error',
      });

    authorize(pin, () => {
      setPin('');
      setClearCodeInput(true);
    });
    setPin('');
  }

  return (
    <RightModalWrapper
      title={mode !== 'success' ? 'Approve Transaction' : ''}
      hideBackground
      show={!!mode}
      closeModal={terminate}
    >
      <AnimateLayout changeTracker={String(mode)} className={'flex flex-col'}>
        {mode === 'success' ? (
          <div className='y-center py-20'>
            <SimpleInformation
              title={<span className='text-xl'>Transfer Successful</span>}
              description={
                <div className='mx-auto mt-1 max-w-[400px]'>
                  You can add money to your wallet by different methods. Choose
                  what suites you.
                </div>
              }
              icon={<GreenCheck />}
              actionButton={{
                text: 'Thanks chief',
                action() {
                  terminate();
                  finish();
                },
              }}
            />
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <CodeInput
              charLimit={4}
              autoComplete='off'
              label='Transaction Pin'
              autoFocus
              type={'password'}
              submit={(code) => setPin(code)}
              name='code'
              clear={clearCodeInput}
              className='h-[54px] 768:h-[68px]'
            />

            <div className='mt-4'>
              <SubmitButton
                submitting={processing}
                type={'submit'}
                disabled={pin.length !== 4}
                className='primary-button mt-4 w-[128px]'
              >
                Send Money
              </SubmitButton>
            </div>
          </form>
        )}
      </AnimateLayout>
    </RightModalWrapper>
  );
};
