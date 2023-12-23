import clsx from 'clsx';
import { Tabs } from 'components/commons/Tabs';
import { useAppContext } from 'context/AppContext';
import { Content } from './Content';
import {
  SubscriptionPlan,
  useGetAllSubscriptionPlans,
} from 'hooks/api/subscriptions/useGetAllSubscriptionPlans';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { useState } from 'react';

export interface Props {
  className?: string;
  choosePlan?: (planCode: string) => void;
  showOnlyPaidPlans?: boolean;
  planId?: string;
  titleClassname?: string;
}

export const ComparePlansTable = (props: Props) => {
  const { isLoading, isError, data } = useGetAllSubscriptionPlans();

  if (isLoading) return <IsLoading />;
  if (isError) return <IsError className={'py-16'} />;

  return <TableWrapper data={data} {...props} />;
};

const TableWrapper = ({
  className,
  data,
  ...props
}: Props & {
  data?: SubscriptionPlan[];
}) => {
  const planTabs = data?.map(({ name, _id }) => ({
    name,
    value: _id,
  }));

  const [selectedPlan, setSelectedPlan] = useState(
    planTabs?.[0] ?? { name: '', value: '' }
  );

  const { screenSize } = useAppContext().state;

  console.log(selectedPlan, screenSize);

  return (
    <>
      <div className='mt-5 block 640:hidden'>
        <Tabs
          className={'w-full rounded-full'}
          sliderClassname={'bg-primary-main rounded-full'}
          tabClassname={'w-full'}
          layoutId={'plan_tabs'}
          tabs={planTabs ?? []}
          displayValueClassname={'text-sm text-black'}
          currentTab={selectedPlan}
          setCurrentTab={setSelectedPlan}
        />
      </div>

      <div className={clsx('mx-auto w-full 640:overflow-x-auto', className)}>
        {screenSize?.mobile ? (
          <Content currentTab={selectedPlan?.value} data={data} {...props} />
        ) : (
          <Content data={data} {...props} />
        )}
      </div>
    </>
  );
};
