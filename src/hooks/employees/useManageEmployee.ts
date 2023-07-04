import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { EmployeeModalType } from 'pages/employees';
import { useState } from 'react';

export const useManageEmployee = () => {
  const [modal, setModal] = useState<EmployeeModalType>(null);

  const [formRecoveryValues, setFormRecoveryValues] = useState<Record<
    string,
    any
  > | null>(null);

  const [currentEmployee, setCurrentEmployee] = useState<IEmployee | null>(
    null
  );

  function closeModal() {
    setCurrentEmployee(null);
    setModal(null);
    setFormRecoveryValues(null);
  }

  return {
    currentEmployee,
    setCurrentEmployee,
    modal,
    setModal,
    closeModal,
    formRecoveryValues,
    setFormRecoveryValues,
  };
};
