import { object, string } from 'yup';

export const validationSchema = object({
  fromDate: string().required('Please select a date'),
  toDate: string().required('Please select a date'),
});
