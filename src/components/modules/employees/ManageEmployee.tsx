import { UpdateEmployeeForm } from 'components/forms/employees/UpdateEmployeeForm';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { IssueWithSubscription } from 'components/modules/app/IssueWithSubscription';
import { UserRole } from 'enums/employee_enum';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { useSubscriptionFeatures } from 'hooks/dashboard/core/useSubscriptionFeatures';
import { EmployeeModalType } from 'hooks/employees/useManageEmployee';
import { useRouter } from 'next/router';

interface Props {
  closeModal: () => void;
  onSuccess?: () => void;
  modal: EmployeeModalType;
  currentEmployee?: IEmployee | null;
  role?: UserRole;
}

export const ManageEmployee = ({
  modal,
  closeModal,
  role,
  onSuccess,
  currentEmployee,
}: Props) => {
  const { push } = useRouter();

  const features = useSubscriptionFeatures();

  return (
    <RightModalWrapper
      show={modal === 'add_employee'}
      title={
        currentEmployee
          ? 'Update User'
          : features.canInviteUser
          ? 'Invite User'
          : ''
      }
      closeModal={closeModal}
      childrenClassname={'py-0 px-4 640:px-8'}
      closeOnClickOutside
    >
      {!currentEmployee && !features.canInviteUser ? (
        <IssueWithSubscription
          wrapperClassname={'mt-8'}
          actionText={'Change plan'}
          action={() => push('/settings/license?_t=change_plan')}
          title={
            <span className={'mx-auto block max-w-[320px]'}>
              Upgrade Your Plan to Expand User Capacity
            </span>
          }
          subTitle='Your Organization has reached its maximum limit for users. To continue adding users, consider upgrading your plan'
        />
      ) : (
        <UpdateEmployeeForm
          {...{
            currentEmployee,
            role,
          }}
          onSuccess={() => {
            closeModal();

            if (!onSuccess) return;
            onSuccess();
          }}
        />
      )}
    </RightModalWrapper>
  );
};
