import clsx from 'clsx';
import { AcceptInviteForm } from 'components/forms/auth/AcceptInviteForm';
import { AuthLayout } from 'components/layouts/AuthLayout';

export default function Invite() {
  return (
    <AuthLayout title='Accept Invitation'>
      <div className={clsx('auth-container mx-auto py-8 640:py-[93px]')}>
        <AcceptInviteForm />
      </div>
    </AuthLayout>
  );
}
