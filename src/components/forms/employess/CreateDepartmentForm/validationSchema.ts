import { object, string } from 'yup';

export const validationSchema = object({
  departmentName: string().required('Please provide department name'),
});
