import { validateAmount } from 'utils/formatters/formatAmount';
import { object, string } from 'yup';

export const validationSchema = object({
  title: string().required('Please provide budget title'),
  description: string().required('Please provide a description'),
  priority: string().required('Please select priority'),
  dueDate: string().required('Please select a date'),
  amount: string()
    .required('Please provide amount')
    .test('min', 'Must be at least NGN10', (value) =>
      validateAmount({
        value,
        limit: 10,
      })
    ),
});
