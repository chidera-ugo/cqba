import clsx from 'clsx';
import { Modal } from 'components/modal';
import { PageHead } from 'components/primary/PageHead';
import { Spinner } from 'components/svgs/dashboard/Spinner';

interface Props {
  white?: boolean;
  id?: string;
  message?: string;
  asPage?: boolean;
  show?: boolean;
}

export const FullScreenLoader = ({
  white,
  message,
  asPage,
  id,
  show = true,
}: Props) => {
  return (
    <div>
      {asPage && <PageHead />}

      <Modal type='fade' {...{ show }} white={white || asPage}>
        <div
          className={clsx(
            white && 'white',
            'z-1000 y-center inset-0 h-screen w-screen'
          )}
          id={id}
        >
          {process.env.NODE_ENV === 'development' && (
            <div className='absolute left-0 top-0 bg-white text-center text-xl text-red-500'>
              {id}
            </div>
          )}

          <div className='y-center'>
            <Spinner
              className={clsx(
                'mx-auto h-12 w-12 animate-spin',
                asPage || white ? 'text-primary-main' : 'text-white'
              )}
            />

            {message && (
              <p className={'z-10 mt-4 text-center font-medium'}>{message}</p>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};
