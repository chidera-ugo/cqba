import clsx from 'clsx';
import { SignUpForm } from 'components/forms/auth/SignUpForm';
import { AuthLayout } from 'components/layouts/AuthLayout';
import { SuccessInformation } from 'components/modules/common/SuccessInformation';
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
          <SuccessInformation
            title='Almost done. Confirm your email.'
            description='We’ve sent a verification link to your email address. Click on the link to verify your email address. If you didn’t get the email, check your spam folder or resend the link.'
            icon='chat'
            actionButton={{
              action() {
                null;
              },
              text: 'Resend Verification Link',
            }}
          />
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
