import clsx from 'clsx';
import { CreateDepartmentForm } from 'components/forms/employess/CreateDepartmentForm';
import { CentredModalWrapper } from 'components/modal/ModalWrapper';
import { SolidCirclePlus } from 'components/svgs/forms/Plus';

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
      className={'min-h-[80vh] px-4 640:min-h-fit'}
    >
      <CreateDepartmentForm onSuccess={closeModal} />
    </CentredModalWrapper>
  );
};

export const CreateDepartmentButton = ({
  className,
  ...props
}: JSX.IntrinsicElements['button']) => {
  return (
    <button
      {...props}
      className={clsx('x-between group w-full px-4 text-black', className)}
      type={'button'}
    >
      <span className='my-auto font-semibold group-hover:underline'>
        Add Department
      </span>
      <span className='my-auto ml-3'>
        <SolidCirclePlus />
      </span>
    </button>
  );
};
