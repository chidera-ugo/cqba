import clsx from 'clsx';
import { FullScreenLoader } from 'components/commons/FullScreenLoader';
import { Cancel } from 'components/illustrations/Cancel';
import { AuthLayout } from 'components/layouts/AuthLayout';
import { SimpleInformation } from 'components/modules/commons/SimpleInformation';
import { AppToast } from 'components/primary/AppToast';
import { useVerifyEmail } from 'hooks/api/auth/useVerifyEmail';
import { useMakeDummyHttpRequest } from 'hooks/commons/useMakeDummyHttpRequest';
import { useQueryValidator } from 'hooks/commons/useQueryValidator';
import { useRouter } from 'next/router';
import NotFound from 'pages/404';
import { toast } from 'react-toastify';

export default function VerifyEmail() {
  const { replace, push } = useRouter();

  const { getValidQuery } = useQueryValidator();

  const email = getValidQuery('email');
  const code = getValidQuery('code');

  const { isLoading: psuedoLoading } = useMakeDummyHttpRequest({
    method: 'get',
    duration: 1000,
  });

  const { isError } = useVerifyEmail(email, code, {
    enabled: !!email && !!code,
    onSuccess() {
      replace('/auth/signin').then(() => {
        toast(<AppToast>Verification successful. Please login</AppToast>, {
          type: 'success',
        });
      });
    },
  });

  if (!psuedoLoading && (!email || !code)) return <NotFound />;

  return (
    <AuthLayout title='Verify Email'>
      {isError ? (
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
      ) : (
        <FullScreenLoader id={'verify_email'} white message={'Please wait'} />
      )}
    </AuthLayout>
  );
}
