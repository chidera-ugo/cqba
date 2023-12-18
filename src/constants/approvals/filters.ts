export const approvalsFilterOptions = (activeLabel?: string) => [
  { title: activeLabel ?? 'Approved', value: 'active' },
  { title: 'Requests', value: 'pending' },
];
