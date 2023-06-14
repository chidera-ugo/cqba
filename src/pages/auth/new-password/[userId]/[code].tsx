import clsx from 'clsx';
import { NewPasswordForm } from 'components/forms/auth/NewPasswordForm';
import { AuthLayout } from 'components/layouts/AuthLayout';
import { useQueryValidator } from 'hooks/common/useQueryValidator';
import NotFound from 'pages/404';

export default function NewPassword() {
  const { validateQuery } = useQueryValidator();

  const userId = validateQuery('userId');
  const code = validateQuery('code');

  if (!userId || !code) return <NotFound />;

  return (
    <AuthLayout title='Set New Password'>
      <div className={clsx('auth-container mx-auto py-8 640:py-[93px]')}>
        <h4>Set new password</h4>
        <div className='mt-4 text-left text-sm text-neutral-600'>
          Create a new password for your account
        </div>

        <NewPasswordForm
          {...{
            userId,
            code,
          }}
        />
      </div>
    </AuthLayout>
  );
}
