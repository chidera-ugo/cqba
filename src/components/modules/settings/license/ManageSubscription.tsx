import { AnimateLayout } from 'components/animations/AnimateLayout';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { ChangePlanForm } from 'components/forms/license/ChangePlanForm';
import { GreenCheck } from 'components/illustrations/Success';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { SimpleInformation } from 'components/modules/commons/SimpleInformation';
import { ConfirmPaymentIntentStatus } from 'components/modules/settings/license/ConfirmPaymentIntentStatus';
import { SelectPaymentMethod } from 'components/modules/settings/license/SelectPaymentMethod';
import {
  ManageSubscriptionProps,
  useManageSubscription,
} from 'hooks/license/useManageSubscription';

export const ManageSubscription = ({
  currentModalType,
  setCurrentModalType,
}: ManageSubscriptionProps) => {
  const {
    mode,
    setSelectedMethod,
    cancel,
    dismiss,
    selectedMethod,
    paymentMethods,
    choosingPlan,
    explorePlan,
    onSuccess,
    paystackConfig,
    proceed,
    plan,
  } = useManageSubscription({ currentModalType, setCurrentModalType });

  const hideTitle = mode === 'success' || mode === 'confirming';

  return (
    <RightModalWrapper
      show={
        currentModalType === 'renew_subscription' ||
        currentModalType === 'change_plan'
      }
      title={
        !hideTitle
          ? currentModalType === 'change_plan'
            ? 'Change Plan'
            : 'Select Payment Option'
          : ''
      }
      closeModal={cancel}
    >
      <AppErrorBoundary>
        <AnimateLayout changeTracker={String(mode)}>
          {mode === 'success' ? (
            <SimpleInformation
              className={'mt-20'}
              icon={<GreenCheck />}
              title={
                <span className='mx-auto block max-w-[240px] text-xl'>
                  Subscription Successful
                </span>
              }
              description={`You have successfully subscribed to ${plan?.name} plan`}
              actionButton={{
                text: 'Explore Plan',
                action: explorePlan,
              }}
            />
          ) : mode === 'confirming' ? (
            <ConfirmPaymentIntentStatus
              onError={dismiss}
              onSuccess={onSuccess}
              intentId={paystackConfig?.metadata?.intent}
            />
          ) : currentModalType === 'change_plan' ? (
            <ChangePlanForm
              {...{
                proceed,
                choosingPlan,
              }}
            />
          ) : (
            <SelectPaymentMethod
              {...{
                setSelectedMethod,
                selectedMethod,
                paymentMethods,
                choosingPlan,
                proceed,
                cancel,
              }}
            />
          )}
        </AnimateLayout>
      </AppErrorBoundary>
    </RightModalWrapper>
  );
};
