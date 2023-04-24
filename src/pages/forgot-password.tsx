import clsx from 'clsx';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { ForgotPasswordForm } from 'components/forms/auth/ForgotPasswordForm';
import { ChatBubbles } from 'components/illustrations/ChatBubbles';
import { AuthLayout } from 'components/layouts/AuthLayout';
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
          <div className='y-center text-center'>
            <div className='mx-auto'>
              <ChatBubbles />
            </div>
            <h4 className='mt-4'>We sent you a reset link.</h4>
            <p className='mt-4'>
              We sent a reset password link to the email address you provided.
              If you didn’t get the email, check your spam folder or try again.
            </p>

            <div className='x-center mt-8'>
              <SubmitButton type='button' className='dark-button'>
                Resend Reset Link
              </SubmitButton>
            </div>
          </div>
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
