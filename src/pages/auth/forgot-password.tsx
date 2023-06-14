import clsx from 'clsx';
import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { ForgotPasswordForm } from 'components/forms/auth/ForgotPasswordForm';
import { AuthLayout } from 'components/layouts/AuthLayout';
import { SimpleInformation } from 'components/modules/common/SimpleInformation';
import { AppToast } from 'components/primary/AppToast';
import { useInitiatePasswordRecovery } from 'hooks/api/auth/useInitiatePasswordRecovery';
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
          />
        ) : (
          <>
            <h4>Forgot your password?</h4>
            <div className='mt-4 text-left text-sm text-neutral-600'>
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
