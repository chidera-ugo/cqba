import { Formik } from 'formik';
import { useMakeDummyHttpRequest } from 'hooks/commons/useMakeDummyHttpRequest';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';

interface Props {
  onSuccess: (password: string) => void;
}

export const ResetPinPasswordForm = ({ onSuccess }: Props) => {
  const { isLoading, mutate } = useMakeDummyHttpRequest({});

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ password }) => {
        mutate(
          { password },
          {
            onSuccess() {
              onSuccess(password);
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
            }}
            processing={isLoading}
          />
        );
      }}
    </Formik>
  );
};
