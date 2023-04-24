import clsx from 'clsx';
import { SignInForm } from 'components/forms/auth/SignInForm';
import { AuthLayout } from 'components/layouts/AuthLayout';
import Link from 'next/link';

export default function Signin() {
  return (
    <AuthLayout title='Signin'>
      <div className={clsx('auth-container mx-auto py-8 640:py-[93px]')}>
        <h4>Sign in</h4>
        <div className='mt-4 text-left text-sm text-neutral-600'>
          {`Don't have an account?`}
          <Link
            href='/signup'
            className='text-button ml-1 text-left font-medium'
          >
            Sign Up
          </Link>
        </div>

        <SignInForm />
      </div>
    </AuthLayout>
  );
}
