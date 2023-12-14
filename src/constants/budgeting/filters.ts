export const budgetingFilterOptions: {
  title: string;
  value: 'active' | 'pending' | 'projects';
  isForPremium?: boolean;
}[] = [
  { title: 'Projects', value: 'projects', isForPremium: true },
  { title: 'Single Budgets', value: 'active' },
];
