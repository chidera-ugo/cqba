export const approvalsFilterOptions: {
  title: string;
  value: 'approved' | 'pending';
  isPremium?: boolean;
}[] = [
  { title: 'Approved', value: 'approved' },
  { title: 'Requests', value: 'pending' },
];
