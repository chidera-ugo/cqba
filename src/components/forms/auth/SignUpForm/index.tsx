import { Formik } from 'formik';
import { useSignup } from 'hooks/api/auth/useSignup';
import { appendCountryCode } from 'utils/modifiers/appendCountryCode';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';

interface Props {
  onSuccess: () => void;
}

export const SignUpForm = ({ onSuccess }: Props) => {
  const { isLoading, mutate } = useSignup({
    onSuccess(res) {
      console.log('res', res);
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ email, phoneNumber, acceptedTerms: _, ...values }) => {
        mutate({
          ...values,
          email: email.trim(),
          phone: appendCountryCode(phoneNumber),
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
