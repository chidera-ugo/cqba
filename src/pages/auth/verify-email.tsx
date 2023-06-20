import clsx from 'clsx';
import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { Cancel } from 'components/illustrations/Cancel';
import { GreenCheck } from 'components/illustrations/Success';
import { AuthLayout } from 'components/layouts/AuthLayout';
import { SimpleInformation } from 'components/modules/common/SimpleInformation';
import { useVerifyEmail } from 'hooks/api/auth/useVerifyEmail';
import { useQueryValidator } from 'hooks/common/useQueryValidator';
import { useRouter } from 'next/router';
import NotFound from 'pages/404';

export default function VerifyEmail() {
  const { replace, push } = useRouter();

  const { validateQuery } = useQueryValidator();

  const email = validateQuery('email');
  const code = validateQuery('code');

  const { isLoading, isError } = useVerifyEmail(email, code, {
    enabled: !!email && !!code,
  });

  if (!email || !code) return <NotFound />;

  const Content = () => {
    if (isLoading) return <FullScreenLoader white message='Verifying Email' />;

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
      <div className='py-20'>
        <SimpleInformation
          title={<span className={'mt-5 block'}>Verification Successful</span>}
          description={
            <span className='mt-3 block'>
              {"We've verified your email, you may proceed"}
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
