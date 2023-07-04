export enum BudgetStatuses {
  'open',
  'closed',
  'paused',
  'approved',
  'declined',
}

export type BudgetStatus = keyof typeof BudgetStatuses;
