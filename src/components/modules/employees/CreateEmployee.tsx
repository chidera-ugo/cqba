import { UpdateEmployeeForm } from 'components/forms/employees/UpdateEmployeeForm';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { EmployeeModalType } from 'hooks/employees/useManageEmployee';

interface Props {
  closeModal: () => void;
  modal: EmployeeModalType;
  currentEmployee?: IEmployee | null;
}

export const CreateEmployee = ({
  modal,
  closeModal,
  currentEmployee,
}: Props) => {
  return (
    <RightModalWrapper
      show={modal === 'add_employee' || modal === 'edit_employee'}
      title={currentEmployee ? 'Update Employee' : 'Add Employee'}
      closeModal={closeModal}
      closeOnClickOutside
      childrenClassname='py-0 640:px-8 px-4'
    >
      <UpdateEmployeeForm
        currentEmployee={currentEmployee}
        onSuccess={closeModal}
      />
    </RightModalWrapper>
  );
};
