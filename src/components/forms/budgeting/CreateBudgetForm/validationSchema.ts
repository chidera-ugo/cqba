import { sanitizeAmount, validateAmount } from 'utils/formatters/formatAmount';
import { object, string } from 'yup';

export const validationSchema = object({
  title: string().required('Please provide budget title'),
  description: string().required('Please provide description'),
  expiryDate: object().test(
    'required',
    'Please provide due date',
    (val: any, ctx) => {
      if (!ctx.parent.expires) return true;
      return !!val.value && !!val.calendarValue;
    }
  ),
  amount: string()
    .required('Please provide amount')
    .test('min', 'Must be at least NGN10', (value) =>
      validateAmount({
        value,
        limit: 10,
      })
    ),
  allocation: string()
    .test('required', 'Please provide allocation', (val, ctx) => {
      if (!ctx.parent.threshold) return true;
      return !!val;
    })
    .test('min', 'Must be at least NGN10', (value, ctx) => {
      if (!ctx.parent.threshold) return true;

      return validateAmount({
        value,
        limit: 10,
      });
    })
    .test(
      'less_than_amount',
      'Cannot be more than budget amount',
      (value, ctx) => {
        if (!ctx.parent.threshold) return true;

        return validateAmount({
          value,
          limit: Number(
            sanitizeAmount({ value: ctx.parent.amount, returnTrueAmount: true })
          ),
          reverse: true,
        });
      }
    ),
});
