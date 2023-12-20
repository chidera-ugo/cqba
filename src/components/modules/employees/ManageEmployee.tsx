import { UpdateEmployeeForm } from 'components/forms/employees/UpdateEmployeeForm';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { UserRole } from 'enums/employee_enum';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { EmployeeModalType } from 'hooks/employees/useManageEmployee';

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
  return (
    <RightModalWrapper
      show={modal === 'add_employee'}
      title={currentEmployee ? 'Update User' : 'Invite User'}
      closeModal={closeModal}
      closeOnClickOutside
      childrenClassname='py-0 640:px-8 px-4'
    >
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
    </RightModalWrapper>
  );
};
