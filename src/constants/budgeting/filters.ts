export const budgetingFilterOptions: {
  title: string;
  value: 'active' | 'pending' | 'projects';
  isPremium?: boolean;
}[] = [
  { title: 'Projects', value: 'projects', isPremium: true },
  { title: 'Single Budgets', value: 'active' },
  { title: 'Requests', value: 'pending' },
];
