import { validateFile } from 'utils/validators/validateField';
import { object, string } from 'yup';

export const validationSchema = object({
  bnNumber: string().required('Please provide your BN number'),
  tin: string().required('Please provide your tax identification number'),
  utilityBillType: string().required('Please select utility bill type'),
  utilityBillFile: object().test(
    'invalidFile',
    'Please upload your utility bill',
    (val) => validateFile(val)
  ),
  bnDocumentFile: object().test(
    'invalidFile',
    'Please upload your BN document',
    (val) => validateFile(val)
  ),
});
