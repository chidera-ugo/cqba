import clsx from 'clsx';

export const ComparePlans = () => {
  return (
    <div className='mx-auto mt-24 max-w-[1200px]'>
      <div className='text-center'>
        <h3 className={'text-3xl font-semibold'}>Compare Plans</h3>
        <p className={'mt-2 px-4 font-medium text-neutral-800'}>
          Compare our plans and choose the best one for you.{' '}
        </p>
      </div>

      <Table />
    </div>
  );
};

const Table = () => {
  const titles = ['', 'Basic', 'Pro', 'Elite'];

  return (
    <div className='overflow-x-auto'>
      <table className='my-11 w-full min-w-[640px] overflow-hidden rounded-t-xl text-left text-sm'>
        <thead className='border border-primary-main'>
          <tr className=''>
            {titles.map((title) => {
              return (
                <th
                  key={title}
                  className='h-[78px] bg-primary-main text-center text-xl font-medium text-white 640:text-2xl'
                >
                  {title}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className='border border-t-0 border-neutral-200'>
          {rows.map(({ title, description, plansEnabledFor }) => {
            return (
              <tr
                key={title}
                title={title}
                className={clsx('border-b border-neutral-200 text-neutral-400')}
              >
                <td scope='row' className='max-w-[220px] bg-white py-4 px-8'>
                  <div className={'text-base font-semibold text-neutral-1000'}>
                    {title}
                  </div>
                  {description && <p className={'text-sm'}>{description}</p>}
                </td>

                <td className='bg-white px-8 text-center font-semibold text-neutral-800'>
                  <div className='x-center'>
                    {!plansEnabledFor?.basic ? (
                      <Cross />
                    ) : typeof plansEnabledFor?.basic === 'string' ? (
                      plansEnabledFor?.basic
                    ) : (
                      <Check />
                    )}
                  </div>
                </td>

                <td className='bg-white px-8 text-center font-semibold text-neutral-800'>
                  <div className='x-center'>
                    {!plansEnabledFor?.pro ? (
                      <Cross />
                    ) : typeof plansEnabledFor?.pro === 'string' ? (
                      plansEnabledFor.pro
                    ) : (
                      <Check />
                    )}
                  </div>
                </td>

                <td className='px-8 text-center font-semibold text-neutral-800'>
                  <div className='x-center'>
                    {!plansEnabledFor?.elite ? (
                      <Cross />
                    ) : typeof plansEnabledFor?.elite === 'string' ? (
                      plansEnabledFor?.elite
                    ) : (
                      <Check />
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const rows: {
  title: string;
  description?: string;
  plansEnabledFor?: {
    basic?: boolean | string;
    pro?: boolean | string;
    elite?: boolean | string;
  };
}[] = [
  {
    title: 'Physical debit cards',
    description:
      'Get cards with individual limits for your team. Up to 3 per team member, fees may apply',
    plansEnabledFor: {
      pro: true,
      elite: '1 free card',
    },
  },
  {
    title: 'Virtual debit cards',
    description:
      'Set up online cards for an additional layer of security. Up to 200 per team member',
    plansEnabledFor: {
      pro: true,
      elite: true,
    },
  },
  {
    title: 'Transfers to Chequebase accounts',
  },
  {
    title: 'Single interbank transfers',
    description:
      'NGN20 fee applies to every local transfer made outside the monthly allowance',
    plansEnabledFor: {
      basic: true,
      pro: '10 free transfers',
      elite: '20 free transfers',
    },
  },
  {
    title: 'Invite unlimited team members',
    plansEnabledFor: {
      basic: '2 invites',
      pro: true,
      elite: true,
    },
  },
  {
    title: 'Team member permissions',
    plansEnabledFor: {
      elite: true,
    },
  },
  {
    title: 'Manage your team’s Payroll',
    description: 'Add members for NGN3,000 per month',
    plansEnabledFor: {
      pro: true,
      elite: true,
    },
  },
  {
    title: 'Invoice',
    plansEnabledFor: {
      pro: '100 Invoices',
      elite: 'Unlimited Invoices',
    },
  },
  {
    title: 'Budgeting',
    plansEnabledFor: {
      pro: '50 Budgets',
      elite: 'Unlimited Budgets',
    },
  },
  {
    title: 'Transfer approval',
    plansEnabledFor: {
      elite: true,
    },
  },
  {
    title: 'Reimbursement',
    plansEnabledFor: {
      pro: true,
      elite: true,
    },
  },
  {
    title: 'Track your team’s expenses',
    description: 'Add members for NGN3,000 per month',
    plansEnabledFor: {
      pro: true,
      elite: true,
    },
  },
  {
    title: 'Dedicated account manager',
    plansEnabledFor: {
      elite: true,
    },
  },
  {
    title: '24/7 support',
    plansEnabledFor: {
      pro: true,
      elite: true,
    },
  },
  {
    title: 'Analytics',
    plansEnabledFor: {
      elite: true,
    },
  },
  {
    title: 'Business API Integration',
    plansEnabledFor: {
      elite: true,
    },
  },
  {
    title: `Connect your company's apps`,
    description: 'Xero, Slack, QuickBooks and more',
    plansEnabledFor: {
      pro: true,
      elite: true,
    },
  },
];

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
