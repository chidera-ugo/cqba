import { Spinner } from 'components/svgs/dashboard/Spinner';

export const IsLoading = ({
  className,
  message,
}: {
  className?: string;
  message?: string;
}) => {
  return (
    <div className='y-center py-20'>
      <div className='x-center'>
        <Spinner className={className} />
      </div>

      {message && <p className={'mt-5 text-center text-sm'}>{message}</p>}
    </div>
  );
};
