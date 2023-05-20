export interface IBudget {
  id: string;
  employee: {
    fullName: string;
    avatar: string;
    department: string;
  };
  request: {
    title: string;
    description: string;
  };
  dueDate: string;
  createdAt: string;
  priority: string;
  amount: number;
  status: string;
}
