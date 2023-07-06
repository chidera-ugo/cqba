import { AppToast } from 'components/primary/AppToast';
import { Formik } from 'formik';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { toast } from 'react-toastify';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';

interface Props {
  onSuccess: () => void;
}

export const ChangePasswordForm = ({ onSuccess }: Props) => {
  const { isLoading, mutate } = useMakeDummyHttpRequest({
    onSuccess() {
      toast(<AppToast>Successfully changed password</AppToast>, {
        type: 'success',
      });
      onSuccess();
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ newPassword, confirmPassword, currentPassword }) => {
        mutate({
          newPassword,
          confirmNewPassword: confirmPassword,
          oldPassword: currentPassword,
        });
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <Form
            {...{
              formikProps,
              processing: isLoading,
            }}
          />
        );
      }}
    </Formik>
  );
};
