import clsx from 'clsx';
import { NewPasswordForm } from 'components/forms/auth/NewPasswordForm';
import { AuthLayout } from 'components/layouts/AuthLayout';

export default function ForgotPassword() {
  return (
    <AuthLayout title='Set New Password'>
      <div className={clsx('auth-container mx-auto py-8 640:py-[93px]')}>
        <h4>Set new password</h4>
        <div className='mt-4 text-left text-sm text-neutral-600'>
          Enter the email address associated with your account and we’ll send
          you a link to reset your password
        </div>

        <NewPasswordForm />
      </div>
    </AuthLayout>
  );
}
