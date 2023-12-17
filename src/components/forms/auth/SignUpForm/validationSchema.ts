import { validatePassword } from 'utils/validators/validatePassword';
import { object, string } from 'yup';

export const validationSchema = object({
  firstName: string().required('Please provide first name'),
  lastName: string().required('Please provide last name'),
  email: string()
    .trim()
    .required('Please provide your email')
    .email('Please provide a valid email'),
  businessName: string().required('Please provide your company name'),
  password: string()
    .trim()
    .required('Please provide new password')
    .test(
      'invalid password',
      'Please fulfill the below requirements',
      validatePassword
    ),
});
