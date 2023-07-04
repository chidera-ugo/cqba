import { SimpleInformation } from 'components/modules/common/SimpleInformation';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
import { useRouter } from 'next/router';

export const ApprovedBudgetDetails = ({ data }: { data: IBudget }) => {
  const { replace } = useRouter();

  if (data?.status !== 'approved')
    return (
      <SimpleInformation
        title={'Oops'}
        description={
          <span className='mt-2 block'>
            This budget has not been approved yet
          </span>
        }
        actionButton={{
          action: () => replace(`/budgeting?_t=${data.status}`),
          text: 'Go Back',
        }}
      />
    );

  return <>{data.id}</>;
};
