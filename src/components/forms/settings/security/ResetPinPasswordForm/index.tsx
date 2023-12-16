import { Formik } from 'formik';
import { useInitiateResetPin } from 'hooks/api/settings/password_recovery/useInitiateResetPin';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';

interface Props {
  onSuccess: (password: string) => void;
}

export const ResetPinPasswordForm = ({ onSuccess }: Props) => {
  const { isLoading, mutate } = useInitiateResetPin({
    onSuccess,
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ password }) => {
        mutate({ password });
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <Form
            {...{
              formikProps,
            }}
            processing={isLoading}
          />
        );
      }}
    </Formik>
  );
};
