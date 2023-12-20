import { string, object } from 'yup';

export const validationSchema = object({
  plan: string().required('Please select subscription plan'),
  paymentMethod: string().required('Please select a payment method'),
});
