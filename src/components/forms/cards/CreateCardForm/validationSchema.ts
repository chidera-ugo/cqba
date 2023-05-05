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
  owner: string().required('Please select an owner'),
  cardName: string().required('Please provide card name'),
});
