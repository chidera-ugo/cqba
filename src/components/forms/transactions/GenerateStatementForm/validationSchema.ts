import { object } from 'yup';

export const validationSchema = object({
  fromDate: object().test(
    'required',
    'Please provide from date',
    (val: any) => {
      return !!val.value && !!val.calendarValue;
    }
  ),
  toDate: object().test('required', 'Please provide to date', (val: any) => {
    return !!val.value && !!val.calendarValue;
  }),
});
