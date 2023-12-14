export const budgetingFilterOptions: {
  title: string;
  value: 'active' | 'pending' | 'projects';
  isForPremium?: boolean;
  isForOwner?: boolean;
}[] = [
  {
    title: 'Projects',
    value: 'projects',
    isForPremium: true,
    isForOwner: true,
  },
  { title: 'Single Budgets', value: 'active' },
];
