import { CreateCategoryForm } from 'components/forms/categories/CreateCategoryForm';
import { CentredModalWrapper } from 'components/modal/ModalWrapper';

interface Props {
  showModal: boolean;
  closeModal: () => void;
}

export const CreateCategory = ({ showModal, closeModal }: Props) => {
  return (
    <CentredModalWrapper
      title={'Add Category'}
      show={showModal}
      closeModal={closeModal}
      closeOnClickOutside
      className={'min-h-[80vh] px-4 640:min-h-fit'}
    >
      <CreateCategoryForm onSuccess={closeModal} />
    </CentredModalWrapper>
  );
};
