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

  const isActive = currentEmployee?.status === 'active';

  function closeModal() {
    // This is because when the employee is active, and the edit employee modal is up, closing it should only close the form modal not the details modal
    if (!isActive) setCurrentEmployee(null);

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
