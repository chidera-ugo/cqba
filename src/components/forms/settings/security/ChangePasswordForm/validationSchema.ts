import { object, string, ref } from 'yup';

export const validationSchema = object({
  currentPassword: string()
    .trim()
    .required('Please provide your current password')
    .min(8, 'Please provide at least 8 characters'),
  newPassword: string()
    .trim()
    .required('Please provide your new password')
    .min(8, 'Please provide at least 8 characters'),
  confirmPassword: string()
    .trim()
    .oneOf([ref('newPassword'), undefined], 'Passwords do not match')
    .required('Please confirm new password'),
});
