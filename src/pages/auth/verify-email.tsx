import clsx from 'clsx';
import { FullScreenLoader } from 'components/commons/FullScreenLoader';
import { Cancel } from 'components/illustrations/Cancel';
import { GreenCheck } from 'components/illustrations/Success';
import { AuthLayout } from 'components/layouts/AuthLayout';
import { SimpleInformation } from 'components/modules/commons/SimpleInformation';
import { useVerifyEmail } from 'hooks/api/auth/useVerifyEmail';
import { useMakeDummyHttpRequest } from 'hooks/commons/useMakeDummyHttpRequest';
import { useQueryValidator } from 'hooks/commons/useQueryValidator';
import { useRouter } from 'next/router';
import NotFound from 'pages/404';

export default function VerifyEmail() {
  const { replace, push } = useRouter();

  const { getValidQuery } = useQueryValidator();

  const email = getValidQuery('email');
  const code = getValidQuery('code');

  const { isLoading: psuedoLoading } = useMakeDummyHttpRequest({
    method: 'get',
    duration: 1000,
  });

  const { isLoading, isError } = useVerifyEmail(email, code, {
    enabled: !!email && !!code,
  });

  if (!psuedoLoading && (!email || !code)) return <NotFound />;

  const Content = () => {
    if (isLoading || psuedoLoading)
      return (
        <FullScreenLoader id={'verify_email'} white message={'Please wait'} />
      );

    if (isError)
      return (
        <div
          className={clsx(
            'auth-container mx-auto max-w-[781px] py-8 640:py-[93px]'
          )}
        >
          <SimpleInformation
            title={
              <span className={'mt-3 block'}>Invalid Verification Link</span>
            }
            icon={<Cancel />}
            actionButton={{
              action() {
                push('/auth/signup');
              },

              text: 'Go Home',
            }}
          />
        </div>
      );

    return (
      <div className='py-20 px-5'>
        <SimpleInformation
          title={<span className={'mt-5 block'}>Verification Successful</span>}
          description={
            <span className='mt-3 block'>
              {
                'Your email has been verified, you may proceed to sign in to your new account'
              }
            </span>
          }
          icon={<GreenCheck />}
          actionButton={{
            action: () => replace('/auth/signin'),
            text: 'Proceed',
          }}
        />
      </div>
    );
  };

  return (
    <AuthLayout title='Verify Email'>
      <Content />
    </AuthLayout>
  );
}
