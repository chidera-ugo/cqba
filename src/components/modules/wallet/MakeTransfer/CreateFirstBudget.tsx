import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { CreateBudgetForm } from 'components/forms/budgeting/CreateBudgetForm';
import { GreenCheck } from 'components/illustrations/Success';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { CreateBudgetPrompt } from 'components/modules/budgeting/CreateBudgetPrompt';
import { SimpleInformation } from 'components/modules/commons/SimpleInformation';
import { AnimateLayout } from 'components/transition/AnimateLayout';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { useState } from 'react';

export const CreateFirstBudget = ({
  show,
  onSuccess,
  close,
}: {
  show: boolean;
  onSuccess: () => void;
  close: () => void;
}) => {
  const { primaryWallet, isLoading, isError } = useManageWallets();
  const [mode, setMode] = useState<'create' | 'success' | 'prompt'>('prompt');

  return (
    <RightModalWrapper
      show={show}
      title={mode === 'create' ? 'Create New Budget' : undefined}
      closeModal={mode === 'create' ? () => setMode('prompt') : close}
      closeOnClickOutside={mode !== 'create'}
      childrenClassname={'p-0'}
    >
      <AnimateLayout
        changeTracker={mode}
        className={'flex flex-col px-4 640:px-8'}
      >
        {mode === 'success' ? (
          <SimpleInformation
            className={'mt-20'}
            icon={<GreenCheck />}
            title={
              <span className='mx-auto block max-w-[240px] text-xl'>
                Budget Created Successfully
              </span>
            }
            description={
              <span
                className={
                  'mt-2 block max-w-[280px] text-base text-neutral-500'
                }
              >
                You have successfully created a budget, you can now spend from
                this wallet.
              </span>
            }
            actionButton={{
              text: "Let's Go",
              action: () => {
                onSuccess();
                setMode('prompt');
              },
            }}
          />
        ) : mode === 'create' ? (
          <CreateBudgetForm
            currency={primaryWallet?.currency}
            onSuccess={() => {
              setMode('success');
            }}
          />
        ) : (
          <>
            {isLoading ? (
              <IsLoading />
            ) : isError ? (
              <IsError />
            ) : (
              <CreateBudgetPrompt
                close={close}
                createBudget={() => setMode('create')}
              />
            )}
          </>
        )}
      </AnimateLayout>
    </RightModalWrapper>
  );
};
