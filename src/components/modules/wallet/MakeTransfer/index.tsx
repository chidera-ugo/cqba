import { FullScreenLoader } from 'components/commons/FullScreenLoader';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { ManageBudgetAndProjectCreation } from 'components/modules/budgeting/ManageBudgetAndProjectCreation';
import { PerformWalletToBank } from 'components/modules/wallet/MakeTransfer/PerformWalletToBank';
import { AppToast } from 'components/primary/AppToast';
import { Outbound } from 'components/svgs/navigation/Arrows';
import { useUserRole } from 'hooks/access_control/useUserRole';
import {
  useGetDebitableProjects,
  useGetDebitableProjectsByMutation,
} from 'hooks/api/budgeting/project/useGetDebitableProjects';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import {
  useGetDebitableBudgets,
  useGetDebitableBudgetsByMutation,
} from 'hooks/api/budgeting/useGetDebitableBudgets';
import { useManageBudgetAndProjectCreation } from 'hooks/budgeting/useManageBudgetAndProjectCreation';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const MakeTransfer = ({ budget }: { budget?: IBudget }) => {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const { modal, setModal, createBudget } = useManageBudgetAndProjectCreation();
  const { isOwner } = useUserRole();
  const { primaryWallet } = useManageWallets();

  const { isLoading, isError, data } = useGetDebitableBudgets();

  const {
    isLoading: _l,
    isError: _e,
    data: projects,
  } = useGetDebitableProjects();

  const { mutate, isLoading: gettingBudgets } =
    useGetDebitableBudgetsByMutation({
      onError: () => null,
    });

  const { mutate: getProjects, isLoading: gettingProjects } =
    useGetDebitableProjectsByMutation({
      onError: () => null,
    });

  useEffect(() => {
    if (showTransferModal && !data?.length && !projects?.length) {
      setShowTransferModal(false);
      setModal('show_prompt');
    }
  }, []);

  return (
    <>
      <FullScreenLoader
        show={(gettingBudgets || gettingProjects) && !modal}
        id={'make_transfer'}
      />

      <ManageBudgetAndProjectCreation
        {...{
          modal,
          setModal,
          createBudget,
        }}
        isTransferFlow
        onFinish={(type) => {
          if (type === 'project')
            return getProjects(null, {
              onSuccess(res) {
                if (!!res?.length) setShowTransferModal(true);
                else if (isOwner) setModal('show_prompt');
              },
            });

          mutate(null, {
            onSuccess(res) {
              if (!!res?.length) setShowTransferModal(true);
              else if (isOwner) setModal('show_prompt');
            },
          });
        }}
      />

      <PerformWalletToBank
        budget={budget}
        budgets={data}
        projects={projects}
        show={showTransferModal}
        createBudget={() => {
          createBudget();
          setShowTransferModal(false);
        }}
        close={() => setShowTransferModal(false)}
      />

      <SubmitButton
        type={'button'}
        submitting={isLoading || _l}
        disabled={!primaryWallet?._id}
        onClick={() => {
          if (isLoading || _l || !primaryWallet?._id) return;

          if (isError || _e)
            return toast(<AppToast>Failed to initiate transfer</AppToast>, {
              type: 'error',
            });

          if (!data?.length && !projects?.length)
            return setModal('show_prompt');

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
