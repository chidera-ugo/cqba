import { phoneNumberTest } from 'utils/validators/validateField';
import { object, string } from 'yup';

export const validationSchema = object({
  phoneNumber: string()
    .required('Please provide your phone number')
    .test('invalidNumber', 'Provide a valid phone number', (val) =>
      phoneNumberTest(val)
    ),
});
