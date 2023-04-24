import { phoneNumberTest } from 'utils/helpers/validateField';
import { object, boolean, string } from 'yup';

export const validationSchema = object({
  firstName: string().required('Please provide your first name'),
  lastName: string().required('Please provide your last name'),
  email: string()
    .required('Please provide your email')
    .email('Please provide a valid email'),
  businessName: string().required('Please provide your company name'),
  industry: string().required('Please provide your industry'),
  country: string().required('Please provide your country'),
  password: string()
    .trim()
    .required('Please provide new password')
    .min(8, 'Please provide at least 8 characters'),
  acceptedTerms: boolean().required('Please accept the terms'),
  phoneNumber: string()
    .required('Please provide your phone number')
    .test('invalidNumber', 'Provide a valid phone number', (val) =>
      phoneNumberTest(val)
    ),
});
