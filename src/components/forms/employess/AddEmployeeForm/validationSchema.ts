import { phoneNumberTest } from 'utils/validators/validateField';
import { object, string } from 'yup';

export const validationSchema = object({
  phoneNumber: string()
    .required('Please provide phone number')
    .test('invalidNumber', 'Provide a valid phone number', (val) =>
      phoneNumberTest(val)
    ),
  lastName: string().required('Please provide last name'),
  firstName: string().required('Please provide first name'),
  email: string()
    .required('Please select provide email')
    .email('Please provide a valid email'),
});
