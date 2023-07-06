import clsx from 'clsx';
import { SettingsLayout } from 'components/layouts/SettingsLayout';
import { ChangePassword } from 'components/modules/settings/security/ChangePassword';
import { ChangePin } from 'components/modules/settings/security/ChangePin';
import { ResetPin } from 'components/modules/settings/security/ResetPin';
import { useAppContext } from 'context/AppContext';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

export default function Security() {
  const { replace, pathname } = useRouter();

  const { user } = useAppContext().state;

  const securitySettings: {
    buttonText: string;
    title: string;
    description: string;
    disabled?: boolean;
    onClick: () => void;
  }[] = [
    {
      title: 'Change Password',
      description: `When changing your password, we strongly recommend using a secure password you don't use anywhere else.`,
      buttonText: 'Change Password',
      onClick: () => replace({ pathname, query: { _m: 'password' } }),
    },
    {
      title: 'Transaction Pin',
      description: `When changing your pin, we strongly recommend using a secure pin you don't use anywhere else.`,
      buttonText: 'Change Pin',
      disabled: !user?.pinSet,
      onClick: () => replace({ pathname, query: { _m: 'pin' } }),
    },
  ];

  return (
    <SettingsLayout>
      <ChangePin hasSetPin={!!user?.pinSet} />
      <ResetPin hasSetPin={!!user?.pinSet} />
      <ChangePassword />

      {securitySettings.map(
        ({ title, description, buttonText, disabled, onClick }) => {
          if (disabled) return <Fragment key={title}></Fragment>;

          return (
            <div
              className={clsx(
                'x-between mb-5 block w-full rounded-xl border border-neutral-200 p-5 640:flex'
              )}
              key={title}
            >
              <div>
                <h6>{title}</h6>
                <p className='mt-1 max-w-[500px] font-normal leading-6 text-neutral-500'>
                  {description}
                </p>
              </div>

              <button
                onClick={onClick}
                className='dark-button mt-4 h-10 px-3 text-sm 640:my-auto'
              >
                {buttonText}
              </button>
            </div>
          );
        }
      )}
    </SettingsLayout>
  );
}
