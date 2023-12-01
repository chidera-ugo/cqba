import clsx from 'clsx';
import { Logo } from 'components/primary/headers/AppHeader';
import { Cancel } from 'components/svgs/navigation/Menu';
import { useAppContext } from 'context/AppContext';
import { SideNavigationItems } from './SideNavigationItems';
import { ProfileSwitcher } from 'components/primary/SideNavigation/ProfileSwitcher';

export const SideNavigation = ({ closeModal }: { closeModal?: () => void }) => {
  const { user } = useAppContext().state;
  const isOwner = user?.role === 'owner';

  return (
    <div
      className={clsx(
        'thin-scrollbar fixed left-0 top-0 z-[1200] w-[324px] overflow-x-visible',
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
  return (
    <div className='y-between relative h-screen'>
      <div className='h-max w-full overflow-y-auto'>
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
            <Cancel />
          </button>
        </div>

        <ProfileSwitcher className={'hidden 1024:block'} {...{ mobile }} />

        <div className='p-5 640:p-8 1024:pt-0'>
          <SideNavigationItems />
        </div>
      </div>

      <div
        className={clsx(
          'sticky bottom-0 left-0 mt-auto hidden py-5 px-5 640:px-8 1024:block',
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
