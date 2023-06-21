import { object, string } from 'yup';

export const validationSchema = object({
  lastName: string().required('Please provide last name'),
  firstName: string().required('Please provide first name'),
  department: string().required('Please select a department'),
  email: string()
    .required('Please select provide email')
    .email('Please provide a valid email'),
});
