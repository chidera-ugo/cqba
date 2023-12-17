import clsx from 'clsx';
import { FullScreenLoader } from 'components/commons/FullScreenLoader';
import { SettingsLayout } from 'components/layouts/SettingsLayout';
import { ChangePin } from 'components/modules/settings/security/ChangePin';
import { ResetPin } from 'components/modules/settings/security/ResetPin';
import { AppToast } from 'components/primary/AppToast';
import { useAppContext } from 'context/AppContext';
import { useLogout } from 'hooks/api/auth/useLogout';
import { useDestroySession } from 'hooks/app/useDestroySession';
import { useRouter } from 'next/router';
import { Fragment, ReactNode } from 'react';
import { toast } from 'react-toastify';

export default function Security() {
  const { replace, pathname } = useRouter();

  const { user } = useAppContext().state;

  const { destroySession } = useDestroySession();

  const { mutate, isLoading } = useLogout({
    onSuccess() {
      toast(<AppToast>You successfully logged out</AppToast>, {
        type: 'success',
      });
      destroySession();
    },
  });

  const securitySettings: {
    button: ReactNode;
    title: string;
    description: string;
    disabled?: boolean;
  }[] = [
    {
      title: 'Change Transaction Pin',
      description: `When changing your pin, we strongly recommend using a secure pin you don't use anywhere else.`,
      disabled: !user?.pinSet,
      button: (
        <button
          onClick={() => replace({ pathname, query: { _m: 'pin' } })}
          className='primary-button h-10 w-[120px] px-3 text-sm'
        >
          Change Pin
        </button>
      ),
    },
    {
      title: 'Log Out',
      description: `Log out of all existing sessions`,
      button: (
        <button
          type={'button'}
          onClick={() => mutate(null)}
          className='h-10 w-[100px] rounded-full bg-red-600 px-3 text-sm text-white hover:bg-red-500'
        >
          Logout
        </button>
      ),
    },
  ];

  return (
    <SettingsLayout>
      <FullScreenLoader show={isLoading} id={'security'} />

      <ChangePin hasSetPin={!!user?.pinSet} />
      <ResetPin hasSetPin={!!user?.pinSet} />

      {securitySettings.map(({ title, description, disabled, button }) => {
        if (disabled) return <Fragment key={title}></Fragment>;

        return (
          <div
            className={clsx(
              'justify-between-between card mb-5 w-full 640:flex'
            )}
            key={title}
          >
            <div className={'w-full'}>
              <h6 className={'text-lg'}>{title}</h6>
              <p className='mt-1 max-w-[500px] text-sm leading-5 text-neutral-500'>
                {description}
              </p>
            </div>

            <div className={'mt-4 flex-shrink-0 640:my-auto'}>{button}</div>
          </div>
        );
      })}
    </SettingsLayout>
  );
}
