import clsx from 'clsx';
import { ForgotPasswordForm } from 'components/forms/auth/ForgotPasswordForm';
import { AuthLayout } from 'components/layouts/AuthLayout';
import { SimpleInformation } from 'components/modules/common/SimpleInformation';
import { useState } from 'react';

export default function ForgotPassword() {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <AuthLayout title='Forgot Password'>
      <div
        className={clsx(
          'auth-container mx-auto py-8 640:py-[93px]',
          isSuccess ? 'max-w-[781px]' : 'max-w-[540px]'
        )}
      >
        {isSuccess ? (
          <SimpleInformation
            title={<span>We sent you a reset link.</span>}
            description={
              <span className='mt-3 block'>
                We sent a reset password link to the email address you provided.
                If you didn’t get the email, check your spam folder or try
                again.
              </span>
            }
            icon='chat'
            actionButton={{
              action() {
                null;
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
                onSuccess() {
                  setIsSuccess(true);
                },
              }}
            />
          </>
        )}
      </div>
    </AuthLayout>
  );
}
