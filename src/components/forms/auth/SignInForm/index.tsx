import { Formik } from 'formik';
import { useSignin } from 'hooks/api/auth/useSignin';
import { useInitiateAuthSession } from 'hooks/app/useInitiateAuthSession';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';

export const SignInForm = ({
  goTo2fa,
}: {
  goTo2fa: (email: string) => void;
}) => {
  const { initiateAuthSession } = useInitiateAuthSession();

  const { isLoading, mutate } = useSignin();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ email: _, password, stayLoggedIn }) => {
        const email = _.trim();

        mutate(
          {
            email,
            password,
            rememberMe: stayLoggedIn,
          },
          {
            onSuccess(res) {
              if (!res.rememberMe) return goTo2fa(email);

              const { access_token, refresh_token } = res.tokens;

              initiateAuthSession(access_token, refresh_token);
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
