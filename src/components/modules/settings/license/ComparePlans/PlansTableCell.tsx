import { RowPlan } from 'components/modules/settings/license/ComparePlans/getPlansRow';

export const PlansTableCell = ({ plan }: { plan?: RowPlan }) => {
  if (!plan) return <></>;

  const { available, freeUnits, featureName } = plan;

  return (
    <>
      {!available ? (
        <Cross />
      ) : freeUnits && freeUnits === -1 ? (
        'Unlimited'
      ) : freeUnits && freeUnits > 1 ? (
        `Up to ${freeUnits} ${featureName}`
      ) : (
        <Check />
      )}
    </>
  );
};

const Cross = () => {
  return (
    <svg
      width='21'
      height='20'
      viewBox='0 0 21 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.33331 14.5L15.3333 5.5'
        stroke='#F34141'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M15.3333 14.5L5.33331 5.5'
        stroke='#F34141'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

const Check = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2.99995 10L7.66113 14.5L17 5.5'
        stroke='#1A44ED'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
