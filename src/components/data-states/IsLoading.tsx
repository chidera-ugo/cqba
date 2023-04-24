import { Spinner } from 'components/svgs/dashboard/Spinner';

export const IsLoading = ({ className }: { className?: string }) => {
  return (
    <div className='x-center py-10'>
      <Spinner className={className} />
    </div>
  );
};
