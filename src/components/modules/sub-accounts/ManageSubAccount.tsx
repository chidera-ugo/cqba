import { UpdateSubAccountForm } from 'components/forms/sub-accounts/UpdateSubAccountForm';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { CreateDepartment } from 'components/modules/employees/CreateDepartment';
import { useManageSubAccount } from 'hooks/sub-accounts/useManageSubAccount';

export const ManageSubAccount = ({
  modal,
  setModal,
  accountToEdit,
  closeModal,
}: ReturnType<typeof useManageSubAccount>) => {
  return (
    <>
      <CreateDepartment
        showModal={modal === 'department'}
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
