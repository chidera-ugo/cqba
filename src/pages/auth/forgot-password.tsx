import clsx from 'clsx';
import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { ForgotPasswordForm } from 'components/forms/auth/ForgotPasswordForm';
import { ChatBubbles } from 'components/illustrations/ChatBubbles';
import { AuthLayout } from 'components/layouts/AuthLayout';
import { SimpleInformation } from 'components/modules/common/SimpleInformation';
import { AppToast } from 'components/primary/AppToast';
import { BackLine } from 'components/svgs/navigation/Arrows';
import { useInitiatePasswordRecovery } from 'hooks/api/auth/useInitiatePasswordRecovery';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const { isLoading, mutate } = useInitiatePasswordRecovery({
    onSuccess() {
      toast(<AppToast>Email has been resent</AppToast>, { type: 'success' });
    },
  });

  return (
    <AuthLayout title='Forgot Password'>
      <FullScreenLoader show={isLoading} />

      <div
        className={clsx(
          'auth-container mx-auto py-8 640:py-[93px]',
          email ? 'max-w-[781px]' : 'max-w-[540px]'
        )}
      >
        {email ? (
          <SimpleInformation
            icon={<ChatBubbles />}
            title={<span>We sent you a reset link.</span>}
            description={
              <span className='mt-3 block'>
                {`We sent a password reset link to the email address you provided.
                If you didn’t get the email, check your spam folder or try
                again.`}
              </span>
            }
            actionButton={{
              action() {
                mutate({ email });
              },
              text: 'Resend Reset Link',
            }}
            slot={
              <div className='mx-auto mt-4 text-left text-sm text-neutral-600'>
                {`Already reset password?`}
                <Link
                  href='/auth/signin'
                  className='text-button ml-1 text-left font-medium'
                >
                  Sign In
                </Link>
              </div>
            }
          />
        ) : (
          <>
            <Link href={'/auth/signin'} className='group mb-4 flex gap-1.5'>
              <BackLine
                className={'my-auto h-4 w-4 stroke-2 text-primary-main'}
              />
              <span className='my-auto text-xs font-medium group-hover:underline'>
                Back to Login
              </span>
            </Link>

            <h4>Forgot your password?</h4>
            <div className='mt-2 text-left text-sm text-neutral-600 640:mt-3'>
              Enter the email address associated with your account and we’ll
              send you a link to reset your password
            </div>

            <ForgotPasswordForm
              {...{
                onSuccess(email) {
                  setEmail(email);
                },
              }}
            />
          </>
        )}
      </div>
    </AuthLayout>
  );
}
