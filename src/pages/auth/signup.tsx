import clsx from 'clsx';
import asset from '/public/assets/auth/moneyTalk.jpg';
import Image from 'next/image';
import { FullScreenLoader } from 'components/commons/FullScreenLoader';
import { SignUpForm } from 'components/forms/auth/SignUpForm';
import { AuthLayout } from 'components/layouts/AuthLayout';
import { SimpleInformation } from 'components/modules/commons/SimpleInformation';
import { AppToast } from 'components/primary/AppToast';
import { useResendVerificationEmail } from 'hooks/api/auth/useResendVerificationEmail';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Signup() {
  const [newUser, setNewUser] = useState<{
    email: string;
  } | null>(null);

  const { isLoading, mutate } = useResendVerificationEmail({
    onSuccess() {
      toast(<AppToast>Email has been resent</AppToast>, { type: 'success' });
    },
  });

  return (
    <AuthLayout title='Signup'>
      <FullScreenLoader show={isLoading} />

      <div
        className={clsx(
          'auth-container mx-auto py-8 640:py-[93px]',
          newUser?.email ? 'max-w-[781px]' : 'max-w-[540px]'
        )}
      >
        {newUser?.email ? (
          <SimpleInformation
            title={
              <span className={'mx-auto block max-w-[300px] 640:max-w-none'}>
                Almost done. Confirm your email.
              </span>
            }
            description={
              <span className='mt-3 block'>
                We’ve sent a verification link to your email address. Click on
                the link to verify your email address. If you didn’t get the
                email, check your spam folder or resend the link.
              </span>
            }
            icon={
              <Image
                src={asset}
                alt={'budget_categories'}
                className={'mx-auto py-10'}
              />
            }
            actionButton={{
              action: () => mutate({ email: newUser.email }),
              text: 'Resend Verification Link',
            }}
            slot={
              <div className='mx-auto mt-4 text-left text-sm text-neutral-600'>
                {`Already verified your account?`}
                <Link
                  href='/auth/signin'
                  className='text-button ml-1 text-left font-medium'
                >
                  Sign In
                </Link>
              </div>
            }
          />
        ) : (
          <>
            <h4>Create a free account</h4>
            <div className='mt-2 text-left text-sm text-neutral-600'>
              {`Already have an account?`}
              <Link
                href='/auth/signin'
                className='text-button ml-1 text-left font-medium'
              >
                Sign In
              </Link>
            </div>

            <SignUpForm
              {...{
                onSuccess({ email }) {
                  setNewUser({ email });
                },
              }}
            />
          </>
        )}
      </div>
    </AuthLayout>
  );
}
