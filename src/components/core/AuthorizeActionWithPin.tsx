import { CodeInput } from 'components/form-elements/CodeInput';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { GreenCheck } from 'components/illustrations/Success';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { SimpleInformation } from 'components/modules/commons/SimpleInformation';
import { AppToast } from 'components/primary/AppToast';
import { AnimateLayout } from 'components/animations/AnimateLayout';
import { useResetter } from 'hooks/commons/useResetter';
import { ReactNode, useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
  finish: () => void;
  processing: boolean;
  submit: (pin: string, errorCb: () => void) => void;
  title: string;
  mode: string | null;
  show: boolean;
  successMessage: string;
  successTitle: string;
  close: () => void;
  actionMessage: string;
  showBackground?: boolean;
  icon?: ReactNode;
};

export const AuthorizeActionWithPin = ({
  processing,
  finish,
  submit,
  title,
  mode,
  icon,
  show,
  close,
  successMessage,
  successTitle,
  actionMessage,
  showBackground,
}: Props) => {
  const [pin, setPin] = useState('');
  const [clearCodeInput, setClearCodeInput] = useResetter();

  return (
    <RightModalWrapper
      title={title}
      hideBackground={!showBackground}
      show={show}
      closeModal={close}
    >
      <AnimateLayout changeTracker={String(mode)}>
        {mode === 'success' ? (
          <div className='y-center py-20'>
            <SimpleInformation
              title={<span className='text-xl'>{successTitle}</span>}
              description={
                <div className='mx-auto mt-1 max-w-[400px]'>
                  {successMessage}
                </div>
              }
              icon={icon ?? <GreenCheck />}
              actionButton={{
                text: 'Thanks chief',
                action: finish,
              }}
            />
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (pin.length !== 4)
                return toast(<AppToast>Please provide a valid PIN</AppToast>, {
                  type: 'error',
                });

              submit(pin, () => {
                setClearCodeInput(true);
              });

              setPin('');
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
                className='primary-button mt-4 min-w-[128px]'
              >
                {actionMessage}
              </SubmitButton>
            </div>
          </form>
        )}
      </AnimateLayout>
    </RightModalWrapper>
  );
};
