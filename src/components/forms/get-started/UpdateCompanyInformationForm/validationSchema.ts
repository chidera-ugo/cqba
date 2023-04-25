import { object, string } from 'yup';

export const validationSchema = object({
  businessName: string().required('Please provide your business name'),
  employees: string().required('Please select number of employees'),
  companyType: string().required('Please select company type'),
  expenses: string().required('Please select averate expenses'),
  address: string().required('Please provide your address'),
  state: string().required('Please select your state'),
  city: string().required('Please select your city'),
});
