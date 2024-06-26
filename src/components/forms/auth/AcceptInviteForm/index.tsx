import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { AppToast } from 'components/primary/AppToast';
import { Formik } from 'formik';
import { useAcceptInvite } from 'hooks/api/auth/useAcceptInvite';
import { useInitiateAuthSession } from 'hooks/app/useInitiateAuthSession';
import { useMakeDummyHttpRequest } from 'hooks/commons/useMakeDummyHttpRequest';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';

export const AcceptInviteForm = () => {
  const { initiateAuthSession } = useInitiateAuthSession();

  const { isLoading: psuedoLoading } = useMakeDummyHttpRequest({
    method: 'get',
  });

  const { query } = useRouter();

  const { code, companyName } = query;

  const { isLoading, mutate } = useAcceptInvite({
    onSuccess(res) {
      if (!res.tokens)
        return toast(<AppToast>An error occurred</AppToast>, { type: 'error' });

      const { access_token, refresh_token } = res.tokens;

      initiateAuthSession(access_token, refresh_token);
    },
  });

  if (psuedoLoading) return <IsLoading />;

  function isValidLink() {
    const vals = [code, companyName];

    for (const i of vals) {
      if (typeof i !== 'string') return false;
    }

    return true;
  }

  if (!isValidLink())
    return <IsError description={'Invalid invitation code'} />;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ phoneNumber, ...values }) => {
        mutate({
          ...values,
          phone: phoneNumber,
          code: String(code),
        });
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <>
            <h4>Welcome to Chequebase</h4>
            <div className='mt-3 text-left text-sm text-neutral-600'>
              You have been invited to {String(companyName)} team. Enter your
              credentials to get started
            </div>

            <Form
              {...{
                businessName: companyName,
                formikProps,
                processing: isLoading,
              }}
            />
          </>
        );
      }}
    </Formik>
  );
};
