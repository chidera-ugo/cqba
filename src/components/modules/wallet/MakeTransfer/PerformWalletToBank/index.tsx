import { CreateBudgetForm } from 'components/forms/budgeting/CreateBudgetForm';
import { initialValues } from 'components/forms/wallet/make-transfer/WalletToBankForm/initialValues';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { WalletToBank } from 'components/modules/wallet/MakeTransfer/PerformWalletToBank/WalletToBank';
import { AnimateLayout } from 'components/transition/AnimateLayout';
import { Dispatch, SetStateAction, useState } from 'react';

interface Props {
  close: () => void;
  show: boolean;
}

export type WalletToBankFormRecoveryValues = typeof initialValues | null;

export type WalletToBankFormRecoveryProps = {
  setFormRecoveryValues: Dispatch<
    SetStateAction<WalletToBankFormRecoveryValues>
  >;
  formRecoveryValues: WalletToBankFormRecoveryValues;
};

export const PerformWalletToBank = ({ close, show }: Props) => {
  const [mode, setMode] = useState<'transfer' | 'create_budget'>('transfer');

  const [formRecoveryValues, setFormRecoveryValues] =
    useState<WalletToBankFormRecoveryValues>(null);

  return (
    <RightModalWrapper
      show={show}
      title={mode === 'create_budget' ? 'Create Budget' : 'Make a transfer'}
      closeModal={mode === 'create_budget' ? () => setMode('transfer') : close}
      childrenClassname={'p-0'}
    >
      <AnimateLayout
        changeTracker={mode}
        className={'flex flex-col px-4 640:px-8'}
      >
        {mode === 'create_budget' ? (
          <CreateBudgetForm
            onSuccess={(budgetId) => {
              setMode('transfer');

              setFormRecoveryValues((prev) => ({
                ...prev!,
                budget: budgetId,
              }));
            }}
          />
        ) : (
          <WalletToBank
            close={() => {
              close();
              setFormRecoveryValues(null);
            }}
            createBudget={() => setMode('create_budget')}
            {...{ formRecoveryValues, setFormRecoveryValues }}
          />
        )}
      </AnimateLayout>
    </RightModalWrapper>
  );
};
