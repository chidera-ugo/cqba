import { object, boolean, string } from 'yup';

export const validationSchema = object({
  bnNumber: string().required('Please provide your BN number'),
  tin: string().required('Please provide your tax identification number'),
  utilityBillType: string().required('Please select utility bill type'),
  utilityBillFile: boolean().isTrue('Please upload your utility bill'),
  bnDocumentFile: boolean().isTrue('Please upload your BN document'),
});
