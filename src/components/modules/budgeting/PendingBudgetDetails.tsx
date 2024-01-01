import { AuthorizeActionWithPin } from 'components/core/AuthorizeActionWithPin';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { ApproveBudgetForm } from 'components/forms/budgeting/ApproveBudgetForm';
import { RejectionReasonForm } from 'components/forms/budgeting/RejectionReasonForm';
import { Cancel } from 'components/illustrations/Cancel';
import { GreenCheck } from 'components/illustrations/Success';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { Confirmation } from 'components/modals/Confirmation';
import { PendingBudgetCard } from 'components/modules/budgeting/PendingBudgetCard';
import { SimpleInformation } from 'components/modules/commons/SimpleInformation';
import { useAppContext } from 'context/AppContext';
import {
  ApproveBudgetDto,
  useApproveBudget,
} from 'hooks/api/budgeting/useApproveBudget';
import { useCancelBudget } from 'hooks/api/budgeting/useCancelBudget';
import { useCloseBudgetOrProject } from 'hooks/api/budgeting/useCloseBudgetOrProject';
import { useGetBudgetById } from 'hooks/api/budgeting/useGetBudgetById';
import { useHandleError } from 'hooks/api/useHandleError';
import { useQueryClientInvalidator } from 'hooks/app/useQueryClientInvalidator';
import { useGetColorByChar } from 'hooks/commons/useGetColorByChar';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface Props {
  id: string;
  close: () => void;
}

export const PendingBudgetDetails = ({ id, close }: Props) => {
  const { push } = useRouter();

  const { user } = useAppContext().state;

  const [mode, setMode] = useState<'success' | 'authorize' | null>(null);
  const [action, setAction] = useState<
    'approve' | 'decline' | 'edit_budget' | 'confirm_cancel' | null
  >(null);
  const [reason, setReason] = useState('');

  const { defaultInvalidator, invalidate } = useQueryClientInvalidator();
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

  const { isLoading: declining, mutate: decline } = useCloseBudgetOrProject(
    data?._id,
    false,
    {
      onSuccess() {
        onSuccess();
        setMode('success');
      },
    }
  );

  const { isLoading: cancelling, mutate: cancel } = useCancelBudget(data?._id, {
    onSuccess() {
      onSuccess();
      close();
    },
  });

  if (gettingBudget || _l) return <IsLoading />;

  if (isError || _e || !primaryWallet || !data) return <IsError />;

  if (data.status === 'active')
    return (
      <SimpleInformation
        className={'py-20'}
        icon={<GreenCheck />}
        title={'Budget Approved'}
        description={
          <span className={'mt-2 block'}>
            This budget has already been approved by admin
          </span>
        }
        actionButton={{
          text: 'View Budget',
          action: () => push(`/budgeting/${data?._id}`),
        }}
      />
    );

  function onSuccess() {
    defaultInvalidator(['budget', data?._id]);
    defaultInvalidator(['budgets']);
  }

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
        hideBackdrop
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
        hasResponse={mode === 'success'}
        show={!!mode}
        icon={action === 'decline' ? <Cancel /> : undefined}
        modalTitle={
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
        responseTitle={
          action === 'decline' ? 'Budget Declined' : 'Budget Approved'
        }
        responseMessage={
          action === 'approve'
            ? `Congratulations! Your budget has been Approved successfully`
            : ''
        }
        authorizeButtonText={
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
                  invalidate('budgets', 'balances');
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

      <Confirmation
        hideBackdrop
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

      {!mode ? (
        <>
          <PendingBudgetCard isDetails {...data} {...{ getColor }} />

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
      ) : null}
    </>
  );
};
