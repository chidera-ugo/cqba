import { object, string } from 'yup';

export const validationSchema = object({
  email: string()
    .required('Please provide your email')
    .email('Please provide a valid email'),
  password: string()
    .trim()
    .required('Please provide new password')
    .min(8, 'Please provide at least 8 characters'),
});
