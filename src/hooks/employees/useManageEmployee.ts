import { IEmployee } from 'hooks/api/employees/useGetAllEmployees';
import { useState } from 'react';

export type EmployeeModalType = 'add_employee' | 'view_employee' | null;

export const useManageEmployee = (close?: () => void) => {
  const [modal, setModal] = useState<EmployeeModalType>(null);

  const [_, setFormRecoveryValues] = useState<Record<string, any> | null>(null);

  const [currentEmployee, setCurrentEmployee] = useState<IEmployee | null>(
    null
  );

  function closeModal() {
    if (close) close();

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
