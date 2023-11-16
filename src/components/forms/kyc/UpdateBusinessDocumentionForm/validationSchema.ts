import { validateFile } from 'utils/validators/validateField';
import { object, string } from 'yup';

export const validationSchema = object({
  bnNumber: string().required('Please provide your BN number'),
  creationDate: object().test(
    'required',
    'Provide company creation date',
    (val: any) => {
      return !!val.value && !!val.calendarValue;
    }
  ),
  utilityBill: object().test(
    'invalidFile',
    'Please upload your utility bill',
    (val) => validateFile(val)
  ),
  businessNameCert: object().test(
    'invalidFile',
    'Upload business name certificate',
    (val) => validateFile(val)
  ),
  cacBn1: object().test('invalidFile', 'Upload your CAC BN1', (val) =>
    validateFile(val)
  ),
});
