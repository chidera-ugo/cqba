import { phoneNumberTest } from 'utils/validators/validateField';
import { validateMultiCheckValues } from 'utils/validators/validateMultiCheckValues';
import { object, string } from 'yup';

export const validationSchema = object({
  phoneNumber: string()
    .required('Please provide your phone number')
    .test('invalidNumber', 'Provide a valid phone number', (val) =>
      phoneNumberTest(val)
    ),
  idNumber: string().required('Please provide ID number'),
  postalCode: string().required('Provide postal code'),
  idType: string().required('Please select ID type'),
  email: string().email('Please provide a valid email'),
  dateOfBirth: object().test(
    'required',
    'Please provide date of birth',
    (val: any) => {
      return !!val.value && !!val.calendarValue;
    }
  ),
  title: object().test('min', 'Please select title', (value) =>
    validateMultiCheckValues(value)
  ),
  percentOwned: string()
    .test('invalid percent', 'Invalid percentage', (val) => {
      const num = parseInt(val ?? '0');
      if (num < 5 || num > 100) return false;
      return true;
    })
    .test('required', 'Please provide percentage', (val) => !!val),
  bvn: string()
    .required('Please provide bvn')
    .length(11, 'Invalid bvn provided'),
  lastName: string().required('Please provide last name'),
  firstName: string().required('Please provide first name'),
  address: string().required('Provide address'),
  state: string().required('Select state'),
  country: string().required('Select country'),
  city: string().required('Select city'),
});
