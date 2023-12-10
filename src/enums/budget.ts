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

export function getPriorityAsText(priority: BudgetPriorities) {
  switch (priority) {
    case BudgetPriorities.High:
      return 'High';
    case BudgetPriorities.Low:
      return 'Low';
    case BudgetPriorities.Medium:
      return 'Medium';
    default:
      return '';
  }
}

export type BudgetStatus = keyof typeof BudgetStatuses;
export type BudgetPriority = keyof typeof BudgetPriorities;
