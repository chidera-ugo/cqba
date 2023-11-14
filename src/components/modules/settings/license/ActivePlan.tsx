import { PlanCard } from 'components/modules/settings/license/PlanCard';
import { usePlanBenefits } from 'hooks/settings/license/usePlanBenefits';

export const ActivePlan = ({
  onlyShowHeader,
}: {
  onlyShowHeader?: boolean;
}) => {
  const { getBenefitsByPlan } = usePlanBenefits();

  return (
    <PlanCard
      className={'max-w-[360px] border-none p-0 640:min-w-[360px]'}
      benefits={getBenefitsByPlan('basic')}
      planName={'Basic'}
      amount={'Free'}
      minimal
      description={'For new businesses'}
      color={'#E28800'}
      isActive
      {...{ onlyShowHeader }}
    />
  );
};
