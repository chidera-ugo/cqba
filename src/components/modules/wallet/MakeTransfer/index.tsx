import { FullScreenLoader } from 'components/commons/FullScreenLoader';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { ManageBudgetAndProjectCreation } from 'components/modules/budgeting/ManageBudgetAndProjectCreation';
import { PerformWalletToBank } from 'components/modules/wallet/MakeTransfer/PerformWalletToBank';
import { AppToast } from 'components/primary/AppToast';
import { Outbound } from 'components/svgs/navigation/Arrows';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import {
  useGetDebitableBudgets,
  useGetDebitableBudgetsByMutation,
} from 'hooks/api/budgeting/useGetDebitableBudgets';
import { useManageBudgetAndProjectCreation } from 'hooks/budgeting/useManageBudgetAndProjectCreation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const MakeTransfer = ({ budget }: { budget?: IBudget }) => {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const { modal, setModal } = useManageBudgetAndProjectCreation();

  const { isLoading, isError, data } = useGetDebitableBudgets();

  const { mutate, isLoading: gettingBudgets } =
    useGetDebitableBudgetsByMutation({
      onError: () => null,
    });

  return (
    <>
      <FullScreenLoader show={gettingBudgets && !modal} id={'make_transfer'} />

      <ManageBudgetAndProjectCreation
        {...{
          modal,
          setModal,
        }}
        onFinish={() => {
          mutate(null, {
            onSuccess(res) {
              if (!!res?.length) setShowTransferModal(true);
              else setModal('show_prompt');
            },
          });
        }}
      />

      <PerformWalletToBank
        budget={budget}
        show={showTransferModal}
        close={() => setShowTransferModal(false)}
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

          if (!data?.length) return setModal('show_prompt');

          setShowTransferModal(true);
        }}
        className='primary-button x-center ml-2 mt-3 h-11 w-full min-w-[163px] px-4 text-sm font-semibold 375:mt-0 1180:w-auto'
      >
        <span className='my-auto mr-2'>Make a transfer</span>
        <span className='my-auto'>
          <Outbound />
        </span>
      </SubmitButton>
    </>
  );
};
