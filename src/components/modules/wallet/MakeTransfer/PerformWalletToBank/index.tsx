import { CreateBudgetForm } from 'components/forms/budgeting/CreateBudgetForm';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { WalletToBank } from 'components/modules/wallet/MakeTransfer/PerformWalletToBank/WalletToBank';
import { AnimateLayout } from 'components/transition/AnimateLayout';
import { useState } from 'react';

interface Props {
  close: () => void;
  show: boolean;
}

export const PerformWalletToBank = ({ close, show }: Props) => {
  const [mode, setMode] = useState<'transfer' | 'create_budget'>('transfer');

  const [formRecoveryValues, setFormRecoveryValues] = useState<Record<
    string,
    any
  > | null>(null);

  return (
    <RightModalWrapper
      show={show}
      title={mode === 'create_budget' ? 'Create Budget' : 'Make a transfer'}
      closeModal={mode === 'create_budget' ? () => setMode('transfer') : close}
      childrenClassname={'p-0'}
    >
      <AnimateLayout changeTracker={mode} className={'px-8 py-5'}>
        {mode === 'create_budget' ? (
          <CreateBudgetForm onSuccess={() => setMode('transfer')} />
        ) : (
          <WalletToBank
            close={close}
            createBudget={() => setMode('create_budget')}
            {...{ formRecoveryValues, setFormRecoveryValues }}
          />
        )}
      </AnimateLayout>
    </RightModalWrapper>
  );
};
