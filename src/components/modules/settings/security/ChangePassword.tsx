import { ChangePasswordForm } from 'components/forms/settings/security/ChangePasswordForm';
import { RightModalWrapper } from 'components/modal/ModalWrapper';
import { useQueryValidator } from 'hooks/common/useQueryValidator';
import { useRouter } from 'next/router';

export const ChangePassword = () => {
  const { getValidQuery } = useQueryValidator();
  const { replace } = useRouter();

  const showModal = getValidQuery('_m') === 'password';

  function closeModal() {
    replace('/settings/security');
  }

  return (
    <RightModalWrapper
      show={showModal}
      title='Change Password'
      closeModal={closeModal}
      closeOnClickOutside
      childrenClassname='py-0 640:px-8 px-4'
    >
      <ChangePasswordForm onSuccess={closeModal} />
    </RightModalWrapper>
  );
};
