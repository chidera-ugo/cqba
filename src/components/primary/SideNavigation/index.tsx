import clsx from 'clsx';
import { Logo } from 'components/primary/headers/AppHeader';
import { Cancel } from 'components/svgs/navigation/Menu';
import { useAppContext } from 'context/AppContext';
import { useUserPlan } from 'hooks/access_control/useUserPlan';
import Image from 'next/image';
import Link from 'next/link';
import { SideNavigationItems } from './SideNavigationItems';
import { ProfileSwitcher } from 'components/primary/SideNavigation/ProfileSwitcher';
import shield from '/public/assets/commons/secure_shield.png';

export const SideNavigation = ({ closeModal }: { closeModal?: () => void }) => {
  const { user } = useAppContext().state;
  const isOwner = user?.role === 'owner';

  return (
    <div
      className={clsx(
        'thin-scrollbar fixed left-0 top-0 z-[1200] w-[300px] overflow-x-visible',
        isOwner ? 'bg-neutral-100' : 'bg-neutral-1000'
      )}
    >
      <div className='relative z-10 h-full min-h-full'>
        <SideNavigationContent {...{ closeModal, isOwner }} />
      </div>
    </div>
  );
};

export const SideNavigationContent = ({
  mobile,
  closeModal,
  isOwner,
}: {
  isOwner?: boolean;
  mobile?: boolean;
  closeModal?: () => void;
}) => {
  const { isPremiumUser } = useUserPlan();

  return (
    <div className='y-between relative h-screen'>
      <div className='h-full w-full overflow-y-auto'>
        <div
          className={clsx(
            'x-between sticky top-0 left-0 z-10 flex h-14 w-full border-b bg-opacity-80 px-5 backdrop-blur-lg 1024:hidden',
            isOwner
              ? 'border-neutral-200 bg-neutral-100 text-neutral-1000'
              : 'border-neutral-900 bg-neutral-1000 text-white'
          )}
        >
          <Logo white={!isOwner} />

          <button onClick={closeModal} type={'button'} className='my-auto flex'>
            <Cancel className={'h-8 w-8'} />
          </button>
        </div>

        <ProfileSwitcher className={'hidden 1024:block'} {...{ mobile }} />

        <div
          className='y-between'
          style={{
            minHeight: 'calc(100%  - 115px)',
          }}
        >
          <div className={'p-5 pb-0 640:p-10 640:pb-0 1024:pt-0'}>
            <SideNavigationItems />
          </div>

          {isPremiumUser && (
            <div className='hidden p-5 pb-0 1024:block'>
              <Link
                href={'/settings/license'}
                className={
                  'y-between relative h-[241px] w-full overflow-hidden rounded-2xl p-6'
                }
                style={{
                  background:
                    'linear-gradient(140.32deg, #3485FD 2.32%, #1A44ED 98.52%)',
                }}
              >
                <div>
                  <h4
                    className={
                      'max-w-[220px] text-xl font-semibold leading-6 text-white'
                    }
                  >
                    Ready to elevate your financial control?
                  </h4>
                  <p className='mt-2 max-w-[200px] text-sm text-white'>
                    Upgrade your plan now to unlock a host of amazing features.
                  </p>
                </div>

                <div className='flex'>
                  <button
                    className={
                      'h-8 w-[80px] rounded-full bg-white text-sm text-primary-main shadow-lg'
                    }
                  >
                    Upgrade
                  </button>
                </div>

                <Image
                  src={shield}
                  className={'absolute -right-24 -bottom-28 rotate-[20deg]'}
                  alt={'shield'}
                />
              </Link>
            </div>
          )}
        </div>
      </div>

      <div
        className={clsx(
          'sticky bottom-0 left-0 hidden py-5 px-5 640:px-8 1024:block',
          isOwner ? 'bg-white 1024:bg-neutral-100' : ''
        )}
      >
        <Logo white={!isOwner} />
      </div>

      <ProfileSwitcher
        top
        className={
          'sticky bottom-0 left-0 mt-auto block w-auto pb-5 pt-0 1024:hidden'
        }
        {...{ mobile }}
      />
    </div>
  );
};
