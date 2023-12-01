import { validatePassword } from 'components/forms/auth/SignUpForm/validationSchema';
import { phoneNumberTest } from 'utils/validators/validateField';
import { object, string } from 'yup';

export const validationSchema = object({
  firstName: string().required('Please provide first name'),
  lastName: string().required('Please provide last name'),
  password: string()
    .trim()
    .required('Please provide new password')
    .test(
      'invalid password',
      'Please fulfill the below requirements',
      validatePassword
    ),
  phoneNumber: string()
    .required('Please provide phone number')
    .test('invalidNumber', 'Provide a valid phone number', (val) =>
      phoneNumberTest(val)
    ),
});
