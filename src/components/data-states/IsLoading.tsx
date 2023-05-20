import { Spinner } from 'components/svgs/dashboard/Spinner';

export const IsLoading = ({ className }: { className?: string }) => {
  return (
    <div className='x-center py-20'>
      <Spinner className={className} />
    </div>
  );
};
