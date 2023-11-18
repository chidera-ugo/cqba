import { phoneNumberTest } from 'utils/validators/validateField';
import { object, string } from 'yup';

export const validationSchema = object({
  firstName: string().required('Please provide first name'),
  lastName: string().required('Please provide last name'),
  role: string().required('Please select a role'),
  email: string()
    .required('Please select provide email')
    .email('Please provide a valid email'),
  phoneNumber: string().test(
    'invalidNumber',
    'Provide a valid phone number',
    (val) => {
      if (!val) return true;
      return phoneNumberTest(val);
    }
  ),
});
