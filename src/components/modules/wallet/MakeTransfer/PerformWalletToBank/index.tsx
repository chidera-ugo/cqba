import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { CreateBudgetForm } from 'components/forms/budgeting/CreateBudgetForm';
import { initialValues } from 'components/forms/wallet/make-transfer/WalletToBankForm/initialValues';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { WalletToBank } from 'components/modules/wallet/MakeTransfer/PerformWalletToBank/WalletToBank';
import { AnimateLayout } from 'components/animations/AnimateLayout';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { useState } from 'react';

export type WalletToBankFormRecoveryValues = typeof initialValues | null;

interface Props {
  close: () => void;
  show: boolean;
  budget?: IBudget;
}

export const PerformWalletToBank = ({ close, budget, show }: Props) => {
  const [mode, setMode] = useState<'transfer' | 'create_budget'>('transfer');

  const { primaryWallet, isError, isLoading } = useManageWallets();

  const [formRecoveryValues, setFormRecoveryValues] =
    useState<WalletToBankFormRecoveryValues>(null);

  function closeModal() {
    setFormRecoveryValues(null);
    close();
  }

  return (
    <RightModalWrapper
      show={show}
      title={mode === 'create_budget' ? 'Create Budget' : 'Make a transfer'}
      closeModal={
        mode === 'create_budget' ? () => setMode('transfer') : closeModal
      }
      childrenClassname={'p-0'}
    >
      <AnimateLayout changeTracker={mode} className={'px-4 640:px-8'}>
        {mode === 'create_budget' ? (
          <CreateBudgetForm
            currency={primaryWallet?.currency}
            onSuccess={(budgetId) => {
              setMode('transfer');

              setFormRecoveryValues((prev) => ({
                ...prev!,
                budget: budgetId,
              }));
            }}
          />
        ) : (
          <>
            {isLoading ? (
              <IsLoading />
            ) : isError ? (
              <IsError />
            ) : (
              <WalletToBank
                budget={budget}
                close={closeModal}
                createBudget={() => setMode('create_budget')}
                {...{ formRecoveryValues, setFormRecoveryValues }}
              />
            )}
          </>
        )}
      </AnimateLayout>
    </RightModalWrapper>
  );
};
