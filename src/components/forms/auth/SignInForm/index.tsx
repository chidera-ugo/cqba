import { Formik } from 'formik';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { useAppStore } from 'lib/useAppStore';
import { saveToLocalStore } from 'lib/localStore';
import { fakeUser } from 'context/AppContext';

export const SignInForm = () => {
  const login = useAppStore((state) => state.login);

  const { isLoading, mutate } = useMakeDummyHttpRequest({
    onSuccess() {
      saveToLocalStore('tokens', { accessToken: 'token' });
      login(fakeUser);
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
