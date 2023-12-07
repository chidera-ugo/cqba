import { Exit } from 'components/svgs/others/Exit';
import { useDestroySession } from 'hooks/app/useDestroySession';

export const LogoutButton = () => {
  const { destroySession } = useDestroySession();

  return (
    <div className={'my-auto'}>
      <button className={'flex gap-2'} onClick={() => destroySession()}>
        <span
          className={
            'text-sm font-semibold text-neutral-1000 hover:text-red-500'
          }
        >
          Logout
        </span>
        <span className='my-auto text-red-500'>
          <Exit />
        </span>
      </button>
    </div>
  );
};
