export enum BudgetStatuses {
  'open',
  'closed',
  'paused',
  'approved',
  'declined',
  'pending',
  'active',
}

export type BudgetStatus = keyof typeof BudgetStatuses;
