import { validateAmount } from 'utils/formatters/formatAmount';
import { object, string } from 'yup';

export const validationSchema = object({
  budget: string().required('Please select budget category'),
  amount: string()
    .required('Please provide amount')
    .test('min', 'Must be at least NGN10', (value) =>
      validateAmount({
        value,
        limit: 10,
      })
    )
    .test('max', 'Above budget balance', (value, ctx) => {
      return validateAmount({
        value,
        limit: ctx.parent.budgetBalance,
        reverse: true,
      });
    }),
  bank: string().required('Please select a bank'),
  accountNumber: string()
    .required('Please provide account number')
    .length(10, 'Account number should be 10 digits'),
});
