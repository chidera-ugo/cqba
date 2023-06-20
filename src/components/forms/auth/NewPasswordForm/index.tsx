import { AppToast } from 'components/primary/AppToast';
import { Formik } from 'formik';
import { useResetPassword } from 'hooks/api/auth/useResetPassword';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';

interface Props {
  userId: string;
  code: string;
}

export const NewPasswordForm = ({ code, userId }: Props) => {
  const { replace } = useRouter();

  const { isLoading, mutate } = useResetPassword({
    onSuccess() {
      replace('/auth/signin').then(() => {
        toast(<AppToast>Password reset successful, please login</AppToast>, {
          type: 'success',
        });
      });
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ password }) => {
        mutate({
          password,
          userId,
          code,
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
