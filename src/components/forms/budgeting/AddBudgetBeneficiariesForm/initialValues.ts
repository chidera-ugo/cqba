import { MultiCheckValue } from 'utils/validators/validateMultiCheckValues';

export const initialValues = {
  splittingRules: false,
  beneficiaries: {} as MultiCheckValue,
  allocations: {} as Record<string, string>,
  budgetAmount: '',
};
