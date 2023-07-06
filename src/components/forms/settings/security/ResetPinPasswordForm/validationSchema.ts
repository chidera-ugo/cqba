import { object, string } from 'yup';

export const validationSchema = object({
  password: string()
    .trim()
    .required('Please provide new password')
    .min(8, 'Please provide at least 8 characters'),
});
