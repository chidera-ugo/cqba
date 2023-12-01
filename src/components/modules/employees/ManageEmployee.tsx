import { UpdateEmployeeForm } from 'components/forms/employees/UpdateEmployeeForm';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { EmployeeModalType } from 'hooks/employees/useManageEmployee';

interface Props {
  closeModal: () => void;
  onSuccess?: () => void;
  modal: EmployeeModalType;
  currentEmployee?: IEmployee | null;
}

export const ManageEmployee = ({
  modal,
  closeModal,
  onSuccess,
  currentEmployee,
}: Props) => {
  const isActive = currentEmployee?.status === 'active';

  return (
    <RightModalWrapper
      show={modal === 'add_employee' || modal === 'edit_employee'}
      title={
        currentEmployee
          ? isActive
            ? 'Change Role'
            : 'Update Employee'
          : 'Add Employee'
      }
      hideBackground={isActive}
      closeModal={closeModal}
      closeOnClickOutside
      childrenClassname='py-0 640:px-8 px-4'
    >
      <UpdateEmployeeForm
        currentEmployee={currentEmployee}
        onSuccess={() => {
          closeModal();

          if (!onSuccess) return;
          onSuccess();
        }}
      />
    </RightModalWrapper>
  );
};
