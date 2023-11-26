import { IsLoading } from 'components/data-states/IsLoading';
import { CodeInput } from 'components/form-elements/CodeInput';
import { GreenCheck } from 'components/illustrations/Success';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { SimpleInformation } from 'components/modules/common/SimpleInformation';
import { AnimateLayout } from 'components/transition/AnimateLayout';
import { TransactProps } from 'hooks/dashboard/core/useTransact';
import { useState } from 'react';

type Props = TransactProps & {
  finish: () => void;
  authorize: (pin: string) => void;
};

export const Transact = ({
  mode,
  setMode,
  transactionType,
  terminate,
  finish,
  authorize,
}: Props) => {
  const [pin, setPin] = useState('');

  function getSuccessTitle() {
    switch (transactionType) {
      default:
        return 'Transfer Successful';
    }
  }

  return (
    <RightModalWrapper
      title={mode !== 'success' ? 'Approve Transaction' : ''}
      hideBackground
      show={!!mode}
      closeModal={terminate}
    >
      <AnimateLayout changeTracker={String(mode)}>
        {mode === 'processing' ? (
          <IsLoading
            className={'text-primary-main'}
            message={'Processing transfer'}
          />
        ) : mode === 'success' ? (
          <div className='y-center py-20'>
            <SimpleInformation
              title={<span className='text-xl'>{getSuccessTitle()}</span>}
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
                  finish();
                },
              }}
            />
          </div>
        ) : (
          <>
            <div className='x-center mt-8'>
              <CodeInput
                charLimit={4}
                autoComplete='off'
                label='Transaction Pin'
                autoFocus
                type={'password'}
                submit={(code) => {
                  setPin(code);
                }}
                name='code'
                className='h-[54px] 768:h-[68px]'
              />
            </div>

            <div className='x-center mt-4'>
              <button
                onClick={() => {
                  authorize(pin);
                  setMode('processing');
                  setPin('');
                }}
                disabled={pin.length !== 4}
                className='primary-button mt-4'
              >
                Send Money
              </button>
            </div>
          </>
        )}
      </AnimateLayout>
    </RightModalWrapper>
  );
};
