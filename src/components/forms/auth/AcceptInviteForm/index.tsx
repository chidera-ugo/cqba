import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { Formik } from 'formik';
import { useAcceptInvite } from 'hooks/api/auth/useAcceptInvite';
import { useInitiateAuthSession } from 'hooks/app/useInitiateAuthSession';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { useRouter } from 'next/router';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';

export const AcceptInviteForm = () => {
  const { initiateAuthSession } = useInitiateAuthSession();

  const { isLoading: psuedoLoading } = useMakeDummyHttpRequest({
    method: 'get',
  });

  const { query } = useRouter();

  const { email, code, businessName } = query;

  const { isLoading, mutate } = useAcceptInvite();

  if (psuedoLoading) return <IsLoading />;

  function isValidLink() {
    const vals = [email, code, businessName];

    for (const i of vals) {
      if (typeof i !== 'string') return false;
    }

    return true;
  }

  if (isValidLink()) return <IsError description={'Invalid invitation code'} />;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ phoneNumber, ...values }) => {
        mutate(
          {
            ...values,
            phone: phoneNumber,
            email: String(email),
            code: String(code),
          },
          {
            onSuccess(res) {
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
          <>
            <h4>Welcome to Chequebase</h4>
            <div className='mt-1 max-w-[400px] text-left text-sm text-neutral-600'>
              You have been invited to {String(businessName)} team enter your
              credentials to get started
            </div>

            <Form
              {...{
                businessName,
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
