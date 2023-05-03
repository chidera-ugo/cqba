import { validateAmount } from 'utils/helpers/formatters/formatAmount';
import { object, string } from 'yup';

export const validationSchema = object({
  amount: string()
    .required('Please provide amount')
    .test('min', 'Must be at least NGN10', (value) =>
      validateAmount({
        value,
        limit: 10,
      })
    ),
  bank: string().required('Please select a bank'),
  accountNumber: string()
    .required('Please provide account number')
    .length(10, 'Account number should be 10 digits'),
});
