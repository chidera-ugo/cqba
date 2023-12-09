import clsx from 'clsx';
import { ComparePlansTable } from 'components/modules/subscriptions/ComparePlans/ComparePlansTable';

interface Props {
  centerText?: boolean;
  tableWrapperClassName?: string;
  tableClassName?: string;
  headerClassname?: string;
  choosePlan?: (planCode: string) => void;
  showOnlyPaidPlans?: boolean;
}

export const ComparePlans = ({
  centerText,
  tableWrapperClassName,
  tableClassName,
  headerClassname,
  choosePlan,
  showOnlyPaidPlans,
}: Props) => {
  return (
    <>
      {!showOnlyPaidPlans && (
        <div className={clsx(headerClassname)}>
          <h3
            className={clsx(
              'text-2xl font-semibold 640:text-3xl',
              centerText && 'text-center'
            )}
          >
            Compare Plans
          </h3>
          <p
            className={clsx(
              'mt-1 max-w-[280px] text-base font-light text-neutral-280 640:max-w-full 640:text-lg',
              centerText && 'mx-auto text-center'
            )}
          >
            Compare our plans and choose the best one for you.
          </p>
        </div>
      )}

      <div className={clsx('min-h-[500px]', tableWrapperClassName)}>
        <ComparePlansTable
          showOnlyPaidPlans={showOnlyPaidPlans}
          choosePlan={choosePlan}
          className={clsx(tableClassName, 'my-6 640:my-11')}
        />
      </div>
    </>
  );
};
