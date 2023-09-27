type Plan = 'elite' | 'pro' | 'basic';

export const usePlanBenefits = () => {
  const planBenefits = [
    { title: 'Transfer to Chequebase accounts', minimumPlan: 'basic' },
    { title: 'Invite team members', minimumPlan: 'basic' },
    { title: 'Team member permissions', minimumPlan: 'basic' },
    { title: 'Budgeting', minimumPlan: 'basic' },
    { title: 'Manage your team’s expenses', minimumPlan: 'pro' },
    { title: '24/7 support', minimumPlan: 'pro' },
    { title: 'Analytics', minimumPlan: 'pro' },
    { title: 'Physical company cards', minimumPlan: 'pro' },
    { title: 'Virtual company cards' },
    { title: 'Team member permissions' },
    { title: 'Manage your team’s Payroll' },
    { title: 'Invoice' },
    { title: 'Reimbursement' },
    { title: 'Dedicated account manager' },
    { title: 'Business API integrations' },
    { title: "Connect your company's apps" },
  ];

  function getBenefitsByPlan(plan: Plan) {
    return planBenefits.filter(({ minimumPlan }) => {
      if (plan === 'elite') return true;
      else if (plan === 'pro')
        return minimumPlan === 'pro' || minimumPlan === 'basic';
      return minimumPlan === 'basic';
    });
  }

  return {
    planBenefits,
    getBenefitsByPlan,
  };
};
