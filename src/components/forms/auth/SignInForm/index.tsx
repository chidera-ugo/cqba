import { Formik } from 'formik';
import { useSignin } from 'hooks/api/auth/useSignin';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';
import { useAppContext } from 'context/AppContext';

export const SignInForm = () => {
  const { dispatch } = useAppContext();

  const { isLoading, mutate } = useSignin({
    onSuccess(res) {
      const { access_token, refresh_token } = res.tokens;

      dispatch({
        type: 'saveTokens',
        payload: {
          accessToken: access_token,
          refreshToken: refresh_token,
        },
      });
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ email, password }) => {
        mutate({
          email: email.trim(),
          password,
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
