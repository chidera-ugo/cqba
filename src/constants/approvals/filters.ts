export const approvalsFilterOptions = (activeLabel?: string) => [
  { title: activeLabel ?? 'Approved', value: 'active' },
  {
    title: 'Projects',
    value: 'projects',
  },
  { title: 'Requests', value: 'pending', countId: 'BUDGET_REQUESTS' },
];
