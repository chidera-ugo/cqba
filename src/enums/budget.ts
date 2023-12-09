export enum BudgetStatuses {
  'open',
  'closed',
  'paused',
  'approved',
  'declined',
  'pending',
  'active',
}

export enum BudgetPriorities {
  High = 1,
  Medium = 2,
  Low = 3,
}

export type BudgetStatus = keyof typeof BudgetStatuses;
export type BudgetPriority = keyof typeof BudgetPriorities;
