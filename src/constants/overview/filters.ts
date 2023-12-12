export const transactionTypeFilterOptions: {
  value: string;
  name: string;
}[] = [
  { value: 'all', name: 'Show All' },
  { value: 'credit', name: 'Inflow' },
  { value: 'debit', name: 'Outflow' },
];

export const periodPresetOptions = [
  { value: 365, name: '12 Months' },
  { value: 30, name: '30 Days' },
  { value: 7, name: '7 Days' },
];
