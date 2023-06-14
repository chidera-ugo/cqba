import { Formik } from 'formik';
import { useSignup } from 'hooks/api/auth/useSignup';
import { appendCountryCode } from 'utils/modifiers/appendCountryCode';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';

interface Props {
  onSuccess: ({ email }: { email: string }) => void;
}

export const SignUpForm = ({ onSuccess }: Props) => {
  const { isLoading, mutate } = useSignup();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ email, phoneNumber, acceptedTerms: _, ...values }) => {
        const _email = email.trim();

        mutate(
          {
            ...values,
            email: _email,
            phone: appendCountryCode(phoneNumber),
          },
          {
            onSuccess: () => onSuccess({ email: _email }),
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
