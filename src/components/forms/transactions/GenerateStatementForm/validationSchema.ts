import { object } from 'yup';

export const validationSchema = object({
  startDate: object().test(
    'required',
    'Please provide start date',
    (val: any) => {
      return !!val?.value && !!val?.calendarValue;
    }
  ),
  endDate: object().test('required', 'Please provide end date', (val: any) => {
    return !!val?.value && !!val?.calendarValue;
  }),
});
