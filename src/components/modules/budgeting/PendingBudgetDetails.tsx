import { useQueryClient } from '@tanstack/react-query';
import { AuthorizeActionWithPin } from 'components/core/AuthorizeActionWithPin';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { ApproveBudgetForm } from 'components/forms/budgeting/ApproveBudgetForm';
import { RejectionReasonForm } from 'components/forms/budgeting/RejectionReasonForm';
import { Cancel } from 'components/illustrations/Cancel';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { PendingBudgetCard } from 'components/modules/budgeting/PendingBudgetCard';
import { useAppContext } from 'context/AppContext';
import {
  ApproveBudgetDto,
  useApproveBudget,
} from 'hooks/api/budgeting/useApproveBudget';
import { useCloseBudget } from 'hooks/api/budgeting/useCloseBudget';
import { useGetBudgetById } from 'hooks/api/budgeting/useGetBudgetById';
import { useHandleError } from 'hooks/api/useHandleError';
import { useGetColorByChar } from 'hooks/commons/useGetColorByChar';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { useState } from 'react';

interface Props {
  id: string;
  close: () => void;
}

export const PendingBudgetDetails = ({ id, close }: Props) => {
  const { user } = useAppContext().state;

  const [mode, setMode] = useState<'success' | 'authorize' | null>(null);
  const [action, setAction] = useState<'approve' | 'decline' | null>(null);
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

  if (gettingBudget || _l) return <IsLoading />;

  if (isError || _e || !primaryWallet || !data) return <IsError />;

  function dismiss() {
    setMode(null);
    setAction(null);
  }

  console.log(action);

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

      <PendingBudgetCard {...data} {...{ getColor }} showFullDetails />

      {user?.role === 'owner' && (
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
      )}
    </>
  );
};
