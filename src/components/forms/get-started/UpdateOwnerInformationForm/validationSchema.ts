import {
  phoneNumberTest,
  validateFile,
} from 'utils/helpers/validators/validateField';
import { object, string } from 'yup';

export const validationSchema = object({
  phoneNumber: string()
    .required('Please provide your phone number')
    .test('invalidNumber', 'Provide a valid phone number', (val) =>
      phoneNumberTest(val)
    ),
  idNumber: string().required('Please provide your ID number'),
  idType: string().required('Please select your form of ID'),
  dateOfBirth: string().required('Please provide your date of birth'),
  gender: string().required('Please select your gender'),
  lastName: string().required('Please provide your last name'),
  firstName: string().required('Please provide your first name'),
  idFile: object().test(
    'invalidFile',
    'Please upload a copy of your ID',
    (val) => validateFile(val)
  ),
  politicalAffiliation: string().required('Please select an option'),
});
