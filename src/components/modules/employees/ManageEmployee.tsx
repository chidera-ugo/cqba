import { CreateDepartment } from 'components/modules/employees/CreateDepartment';
import { CreateEmployee } from 'components/modules/employees/CreateEmployee';
import { useManageEmployee } from 'hooks/employees/useManageEmployee';

export const ManageEmployee = ({
  currentEmployee,
  formRecoveryValues,
  setFormRecoveryValues,
  modal,
  closeModal,
  setModal,
}: ReturnType<typeof useManageEmployee>) => {
  return (
    <>
      <CreateEmployee
        {...{
          setModal,
          closeModal,
          setFormRecoveryValues,
          formRecoveryValues,
          currentEmployee,
          modal,
        }}
      />

      <CreateDepartment
        showModal={modal === 'department'}
        closeModal={() => {
          setModal('employee');
        }}
      />
    </>
  );
};
