import { object, ref, string } from 'yup';

export const validationSchema = object({
  password: string()
    .trim()
    .required('Please provide new password')
    .min(8, 'Please provide at least 8 characters'),
  confirmPassword: string()
    .trim()
    .oneOf([ref('password'), ''], 'Passwords do not match')
    .required('Please confirm new password'),
});
