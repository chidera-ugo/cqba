import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { useState } from 'react';

export type EmployeeModalType =
  | 'department'
  | 'add_employee'
  | 'view_employee'
  | 'edit_employee'
  | null;

export const useManageEmployee = () => {
  const [modal, setModal] = useState<EmployeeModalType>(null);

  const [_, setFormRecoveryValues] = useState<Record<string, any> | null>(null);

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
  };
};
