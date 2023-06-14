import { validateAmount } from 'utils/formatters/formatAmount';
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
  subAccounts: object().test(
    'min',
    'Selected at least one account',
    (value) => {
      const selectedAtLeastOneAccount = Object.values(value).find((val) => val);
      return !!selectedAtLeastOneAccount;
    }
  ),
});
