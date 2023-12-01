import { SubmitButton } from 'components/form-elements/SubmitButton';
import { CreateFirstBudget } from 'components/modules/wallet/MakeTransfer/CreateFirstBudget';
import { PerformWalletToBank } from 'components/modules/wallet/MakeTransfer/PerformWalletToBank';
import { AppToast } from 'components/primary/AppToast';
import { Outbound } from 'components/svgs/navigation/Arrows';
import { useGetAllBudgetsUnpaginated } from 'hooks/api/budgeting/useGetAllBudgets';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const MakeTransfer = () => {
  const [modal, setModal] = useState<'create_budget' | 'transfer' | null>(null);

  const { isLoading, isError, data } = useGetAllBudgetsUnpaginated();

  return (
    <>
      <CreateFirstBudget
        show={modal === 'create_budget'}
        onSuccess={() => setModal('transfer')}
        close={() => setModal(null)}
      />

      <PerformWalletToBank
        show={modal === 'transfer'}
        close={() => setModal(null)}
      />

      <SubmitButton
        type={'button'}
        submitting={isLoading}
        onClick={() => {
          if (isLoading) return;

          if (isError)
            return toast(<AppToast>Failed to initiate transfer</AppToast>, {
              type: 'error',
            });

          if (!data?.docs?.length) return setModal('create_budget');

          setModal('transfer');
        }}
        className='primary-button x-center mt-3 h-11 w-full min-w-[163px] px-4 text-sm font-semibold 375:mt-0 1180:w-auto'
      >
        <span className='my-auto mr-2'>Make a transfer</span>
        <span className='my-auto'>
          <Outbound />
        </span>
      </SubmitButton>
    </>
  );
};
