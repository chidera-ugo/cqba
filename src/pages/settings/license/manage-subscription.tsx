import { AppLayout } from 'components/layouts/AppLayout';
import { CancelPlan } from 'components/modules/settings/license/CancelPlan';
import { ComparePlans } from 'components/modules/settings/license/ComparePlans';
import { PlanCard } from 'components/modules/settings/license/PlanCard';
import { Cross } from 'components/svgs/navigation/Exit';
import { usePlanBenefits } from 'hooks/settings/license/usePlanBenefits';
import Link from 'next/link';
import NotFound from 'pages/404';
import { useState } from 'react';

export default function ManageSubscription() {
  const { planBenefits: benefits } = usePlanBenefits();

  const [showModal, setShowModal] = useState(false);

  const plans: {
    name: string;
    amount: string;
    description: string;
    color: string;
    isActive?: boolean;
    isBestValue?: boolean;
  }[] = [
    {
      name: 'basic',
      amount: '1000',
      description: 'For new businesses',
      isActive: true,
      color: '#E28800',
    },
    {
      name: 'pro',
      description:
        'For small sized businesses. Billed Every Month. Cancel Anytime',
      amount: '2500',
      color: '#00AC11',
    },
    {
      name: 'elite',
      description:
        'For medium & large scale businesses. Billed Every Month. Cancel Anytime',
      amount: '5000',
      color: '#1A44ED',
      isBestValue: true,
    },
  ];

  if (!false) return <NotFound />;

  return (
    <AppLayout
      title='Manage Subscription'
      hideSideNavigation
      headerSlot={
        <Link href={'/settings/license'} className={'group flex'}>
          <span
            className={'my-auto mr-1 text-sm font-medium group-hover:underline'}
          >
            Skip for Later
          </span>
          <span className='my-auto'>
            <Cross className={'h-5 w-5 text-primary-main'} />
          </span>
        </Link>
      }
    >
      <CancelPlan {...{ showModal, setShowModal }} />

      <div className='mx-auto max-w-[802px] py-10 text-center'>
        <h3 className={'font-semibold'}>
          Choose the Right Plan for Your Business
        </h3>
        <p className={'mt-4 font-medium text-neutral-800'}>
          Choose a free plan or pick the subscription plan that fits your
          business.
        </p>
      </div>

      <div className='mx-auto grid max-w-[1200px] grid-cols-12 gap-5'>
        {plans.map(
          ({ name, isBestValue, amount, color, isActive, description }) => {
            return (
              <PlanCard
                className={
                  'col-span-12 p-6 py-7 640:col-span-6 1024:col-span-4'
                }
                key={name}
                planName={name}
                {...{
                  amount,
                  isActive,
                  benefits,
                  isBestValue,
                  description,
                  color,
                }}
              >
                {isActive && (
                  <button
                    onClick={() => setShowModal(true)}
                    className={
                      'text-button mt-4 inline-block py-1 font-medium text-red-500'
                    }
                  >
                    Cancel Plan
                  </button>
                )}
              </PlanCard>
            );
          }
        )}
      </div>

      <ComparePlans />
    </AppLayout>
  );
}
