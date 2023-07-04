import { UpdateEmployeeForm } from 'components/forms/employees/UpdateEmployeeForm';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  closeModal: () => void;
  setModal: Dispatch<SetStateAction<any>>;
  modal: any;
  currentEmployee?: IEmployee | null;
  formRecoveryValues?: Record<string, any> | null;
  setFormRecoveryValues?: Dispatch<SetStateAction<Record<string, any> | null>>;
  hideCreateDepartmentButton?: boolean;
}

export const CreateEmployee = ({
  modal,
  setModal,
  setFormRecoveryValues,
  closeModal,
  hideCreateDepartmentButton,
  currentEmployee,
  formRecoveryValues,
}: Props) => {
  return (
    <RightModalWrapper
      show={modal === 'employee'}
      title='Add Employee'
      closeModal={closeModal}
      closeOnClickOutside
      childrenClassname='py-0 640:px-8 px-4'
    >
      <UpdateEmployeeForm
        addDepartment={
          hideCreateDepartmentButton
            ? undefined
            : (values) => {
                setModal('department');

                if (!setFormRecoveryValues) return;
                setFormRecoveryValues(values);
              }
        }
        {...{
          currentEmployee,
          formRecoveryValues,
        }}
        onSuccess={closeModal}
      />
    </RightModalWrapper>
  );
};
