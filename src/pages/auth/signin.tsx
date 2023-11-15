import clsx from 'clsx';
import { SignInForm } from 'components/forms/auth/SignInForm';
import { AuthLayout } from 'components/layouts/AuthLayout';
import { VerifyLoginOtp } from 'components/modules/auth/VerifyLoginOtp';
import Link from 'next/link';
import { useState } from 'react';

export default function Signin() {
  const [email, setEmail] = useState('');

  return (
    <AuthLayout title='Signin'>
      {email ? (
        <VerifyLoginOtp email={email} back={() => setEmail('')} />
      ) : (
        <div className={clsx('auth-container mx-auto py-8 640:py-[93px]')}>
          <h4>Sign in</h4>
          <div className='mt-2 text-left text-sm text-neutral-600'>
            {`Don't have an account?`}
            <Link
              href='/auth/signup'
              className='text-button ml-1 text-left font-medium'
            >
              Sign Up
            </Link>
          </div>

          <SignInForm
            goTo2fa={(email) => {
              setEmail(email);
            }}
          />
        </div>
      )}
    </AuthLayout>
  );
}
