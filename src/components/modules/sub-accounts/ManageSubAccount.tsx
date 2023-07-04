import { UpdateSubAccountForm } from 'components/forms/sub-accounts/UpdateSubAccountForm';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { CreateDepartment } from 'components/modules/employees/CreateDepartment';
import { CreateEmployee } from 'components/modules/employees/CreateEmployee';
import { ISubAccount } from 'hooks/api/sub-accounts/useGetAllSubAccounts';
import { SubAccountModalsType } from 'pages/sub-accounts';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  accountToEdit: ISubAccount | null;
  modal: SubAccountModalsType;
  setModal: Dispatch<SetStateAction<SubAccountModalsType>>;
  closeModal: () => void;
}

export const ManageSubAccount = ({
  modal,
  closeModal,
  setModal,
  accountToEdit,
}: Props) => {
  return (
    <>
      <CreateDepartment
        showModal={modal === 'department'}
        closeModal={() => {
          setModal('create');
        }}
      />

      <CreateEmployee
        {...{
          setModal,
          modal,
        }}
        hideCreateDepartmentButton
        closeModal={() => {
          setModal('create');
        }}
      />

      <RightModalWrapper
        show={modal === 'create'}
        title={`${accountToEdit ? 'Update' : 'Create'} Sub Account`}
        closeModal={closeModal}
        closeOnClickOutside
        childrenClassname='py-0 640:px-8 px-4'
      >
        <UpdateSubAccountForm
          onSuccess={closeModal}
          currentSubAccount={accountToEdit}
          addDepartment={() => setModal('department')}
          addEmployee={() => setModal('employee')}
        />
      </RightModalWrapper>
    </>
  );
};
