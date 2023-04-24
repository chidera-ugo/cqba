import { Formik } from 'formik';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { saveToLocalStore } from 'lib/localStore';
import { fakeUser, useAppContext } from 'context/AppContext';

export const SignInForm = () => {
  const { dispatch } = useAppContext();

  const { isLoading, mutate } = useMakeDummyHttpRequest({
    onSuccess() {
      saveToLocalStore('tokens', { accessToken: 'token' });
      dispatch({ type: 'login', payload: fakeUser });
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ ...values }) => {
        mutate({
          ...values,
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
