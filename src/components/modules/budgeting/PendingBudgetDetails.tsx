import { useQueryClient } from '@tanstack/react-query';
import { AuthorizeActionWithPin } from 'components/core/AuthorizeActionWithPin';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { ApproveBudgetForm } from 'components/forms/budgeting/ApproveBudgetForm';
import { RejectionReasonForm } from 'components/forms/budgeting/RejectionReasonForm';
import { Cancel } from 'components/illustrations/Cancel';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { Confirmation } from 'components/modals/Confirmation';
import { ManageBudgetCreation } from 'components/modules/budgeting/ManageBudgetCreation';
import { PendingBudgetCard } from 'components/modules/budgeting/PendingBudgetCard';
import { AppToast } from 'components/primary/AppToast';
import { useAppContext } from 'context/AppContext';
import {
  ApproveBudgetDto,
  useApproveBudget,
} from 'hooks/api/budgeting/useApproveBudget';
import { useCancelBudget } from 'hooks/api/budgeting/useCancelBudget';
import { useCloseBudget } from 'hooks/api/budgeting/useCloseBudget';
import { useGetBudgetById } from 'hooks/api/budgeting/useGetBudgetById';
import { useHandleError } from 'hooks/api/useHandleError';
import { useGetColorByChar } from 'hooks/commons/useGetColorByChar';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  id: string;
  close: () => void;
}

export const PendingBudgetDetails = ({ id, close }: Props) => {
  const { user } = useAppContext().state;

  const [mode, setMode] = useState<'success' | 'authorize' | null>(null);
  const [action, setAction] = useState<
    'approve' | 'decline' | 'edit_budget' | 'confirm_cancel' | null
  >(null);
  const [reason, setReason] = useState('');

  const queryClient = useQueryClient();
  const { getColor } = useGetColorByChar();
  const { handleError } = useHandleError();

  const { isLoading: gettingBudget, isError, data } = useGetBudgetById(id);
  const { primaryWallet, isError: _e, isLoading: _l } = useManageWallets();

  const [approveBudgetValues, setApproveBudgetValues] =
    useState<ApproveBudgetDto | null>(null);

  const { mutate: approve, isLoading: approving } = useApproveBudget(
    data?._id,
    {
      onError: () => null,
    }
  );

  const { isLoading: declining, mutate: decline } = useCloseBudget(data?._id, {
    onSuccess() {
      queryClient.invalidateQueries(['budget', data?._id]);
      queryClient.invalidateQueries(['budgets']);
      setMode('success');
    },
  });

  const { isLoading: cancelling, mutate: cancel } = useCancelBudget(data?._id, {
    onSuccess() {
      queryClient.invalidateQueries(['budget', data?._id]);
      queryClient.invalidateQueries(['budgets']);
      close();
      toast(<AppToast>Canceled budget successfully</AppToast>, {
        type: 'success',
      });
    },
  });

  if (gettingBudget || _l) return <IsLoading />;

  if (isError || _e || !primaryWallet || !data) return <IsError />;

  function dismiss() {
    setMode(null);
    setAction(null);
  }

  return (
    <>
      <RightModalWrapper
        closeModal={() => {
          setAction(null);
        }}
        hideBackground
        title={'Decline Budget'}
        show={action === 'decline' && !mode}
        childrenClassname={'pt-4 px-8'}
      >
        <RejectionReasonForm
          proceed={(reason) => {
            setMode('authorize');
            setReason(reason);
          }}
        />
      </RightModalWrapper>

      <AuthorizeActionWithPin
        mode={mode}
        show={!!mode}
        icon={action === 'decline' ? <Cancel /> : undefined}
        title={
          mode !== 'success'
            ? action === 'decline'
              ? 'Authorize Decline'
              : 'Approve Budget'
            : ''
        }
        close={() => {
          dismiss();
          if (mode === 'success') close();
        }}
        processing={declining || approving}
        finish={() => {
          dismiss();
          close();
        }}
        successTitle={
          action === 'decline' ? 'Budget Declined' : 'Budget Approved'
        }
        successMessage={
          action === 'approve'
            ? `Congratulations! Your budget has been Approved successfully`
            : ''
        }
        actionMessage={
          action === 'decline' ? 'Decline Budget' : 'Approve Budget'
        }
        submit={(pin, errorCb) => {
          if (action === 'decline') {
            decline({
              pin,
              reason,
            });
          } else {
            approve(
              {
                ...approveBudgetValues!,
                pin,
              },
              {
                onSuccess() {
                  queryClient.invalidateQueries(['budgets']);
                  queryClient.invalidateQueries(['wallets']);
                  setMode('success');
                },
                onError(e) {
                  handleError(e);
                  errorCb();
                },
              }
            );
          }
        }}
      />

      <ManageBudgetCreation
        budget={data}
        hideBackground
        onFinish={close}
        show={action === 'edit_budget'}
        close={() => setAction(null)}
      />

      <Confirmation
        hideBackground
        show={action === 'confirm_cancel'}
        buttonTexts={['Cancel', 'Continue']}
        title='Cancel Budget'
        subTitle={
          'Are you sure you want to cancel this budget? This cannot be reversed'
        }
        positive={() => {
          setAction(null);
          cancel(null);
        }}
        negative={() => setAction(null)}
      />

      <PendingBudgetCard {...data} {...{ getColor }} showFullDetails />

      {user?.role === 'owner' ? (
        <ApproveBudgetForm
          amount={data?.amount}
          decline={() => setAction('decline')}
          onSubmit={(values) => {
            setApproveBudgetValues((prev) => ({
              ...prev!,
              ...values,
            }));

            setAction('approve');
            setMode('authorize');
          }}
          currency={primaryWallet?.currency}
        />
      ) : (
        <div className='mt-8 flex gap-3'>
          <button
            onClick={() => setAction('edit_budget')}
            type={'button'}
            className={'primary-button'}
          >
            Edit Budget
          </button>

          <SubmitButton
            type={'button'}
            submitting={cancelling}
            onClick={() => setAction('confirm_cancel')}
            className='secondary-button w-full min-w-[120px] 640:w-auto'
          >
            Cancel Budget
          </SubmitButton>
        </div>
      )}
    </>
  );
};
