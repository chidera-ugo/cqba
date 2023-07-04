import { validateAmount } from 'utils/formatters/formatAmount';
import { object, string } from 'yup';

export const validationSchema = object({
  title: string().required('Please provide budget title'),
  description: string().required('Please provide a description'),
  priority: string().required('Please select priority'),
  dueDate: object().test('required', 'Please provide due date', (val: any) => {
    return !!val.value && !!val.calendarValue;
  }),
  categoryId: string().required('Please select a category'),
  amount: string()
    .required('Please provide amount')
    .test('min', 'Must be at least NGN10', (value) =>
      validateAmount({
        value,
        limit: 10,
      })
    ),
});
