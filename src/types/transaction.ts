export interface IWalletTransaction {
  _id: string;
  type: string;
  budget: Budget;
  status: 'successful' | 'pending' | 'failed' | string;
  amount: number;
  currency: string;
  scope: string;
  fee: number;
  reference: string;
  createdAt: string;
  id: string;
}

export interface Budget {
  _id: string;
  name: string;
}
