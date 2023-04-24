import clsx from 'clsx';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { SignUpForm } from 'components/forms/auth/SignUpForm';
import { ChatBubbles } from 'components/illustrations/ChatBubbles';
import { AuthLayout } from 'components/layouts/AuthLayout';
import Link from 'next/link';
import { useState } from 'react';

export default function Signup() {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <AuthLayout title='Signup'>
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
            <h4 className='mt-4'>Almost done. Confirm your email.</h4>
            <p className='mt-4'>
              We’ve sent a verification link to your email address. Click on the
              link to verify your email address. If you didn’t get the email,
              check your spam folder or resend the link.
            </p>

            <div className='x-center mt-8'>
              <SubmitButton type='button' className='dark-button'>
                Resend Verification Link
              </SubmitButton>
            </div>
          </div>
        ) : (
          <>
            <h4>Create a free account</h4>
            <div className='mt-4 text-left text-sm text-neutral-600'>
              {`Already have an account?`}
              <Link
                href='/signin'
                className='text-button ml-1 text-left font-medium'
              >
                Sign In
              </Link>
            </div>

            <SignUpForm
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
