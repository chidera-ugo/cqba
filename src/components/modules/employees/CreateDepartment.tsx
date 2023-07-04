import { CreateDepartmentForm } from 'components/forms/employees/CreateDepartmentForm';
import { CentredModalWrapper } from 'components/modal/ModalWrapper';

interface Props {
  showModal: boolean;
  closeModal: () => void;
}

export const CreateDepartment = ({ showModal, closeModal }: Props) => {
  return (
    <CentredModalWrapper
      title={'Add Department'}
      show={showModal}
      closeModal={closeModal}
      closeOnClickOutside
      className={'min-h-[80vh] px-4 640:min-h-fit'}
    >
      <CreateDepartmentForm onSuccess={closeModal} />
    </CentredModalWrapper>
  );
};
