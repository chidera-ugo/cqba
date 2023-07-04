import { ISubAccount } from 'hooks/api/sub-accounts/useGetAllSubAccounts';
import { SubAccountModalsType } from 'pages/sub-accounts';
import { useState } from 'react';

export const useManageSubAccount = () => {
  const [modal, setModal] = useState<SubAccountModalsType>(null);

  const [accountToEdit, setAccountToEdit] = useState<ISubAccount | null>(null);

  function closeModal() {
    setModal(null);
    setAccountToEdit(null);
  }

  return {
    modal,
    setModal,
    accountToEdit,
    setAccountToEdit,
    closeModal,
  };
};
