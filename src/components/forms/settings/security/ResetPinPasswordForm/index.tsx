import { Formik } from 'formik';
import { useInitiatePinReset } from 'hooks/api/settings/password_recovery/useInitiatePinReset';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';

interface Props {
  onSuccess: (hash: string) => void;
}

export const ResetPinPasswordForm = ({ onSuccess }: Props) => {
  const { isLoading, mutate } = useInitiatePinReset({
    onSuccess(res) {
      onSuccess(res.hash);
    },
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
