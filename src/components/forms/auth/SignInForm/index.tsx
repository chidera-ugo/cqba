import { AppToast } from 'components/primary/AppToast';
import { Formik } from 'formik';
import { useSignin } from 'hooks/api/auth/useSignin';
import { useInitiateAuthSession } from 'hooks/app/useInitiateAuthSession';
import { toast } from 'react-toastify';
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
      onSubmit={({ email: _, password, rememberMe }) => {
        const email = _.trim();

        mutate(
          {
            email,
            password,
            rememberMe,
          },
          {
            onSuccess(res) {
              if (!res.rememberMe) return goTo2fa(email);

              if (!res.tokens)
                return toast(<AppToast>An error occurred</AppToast>, {
                  type: 'error',
                });

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
