import { Formik } from 'formik';
import { useInitiatePasswordRecovery } from 'hooks/api/auth/useInitiatePasswordRecovery';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';

interface Props {
  onSuccess: (email: string) => void;
}

export const ForgotPasswordForm = ({ onSuccess }: Props) => {
  const { isLoading, mutate } = useInitiatePasswordRecovery();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const email = values.email.trim();

        mutate(
          {
            email,
          },
          {
            onSuccess() {
              onSuccess(email);
            },
          }
        );
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
