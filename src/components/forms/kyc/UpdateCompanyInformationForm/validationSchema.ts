import { object, string } from 'yup';

export const validationSchema = object({
  businessName: string().required('Provide your company name'),
  employees: string().required('Select number of employees'),
  companyType: string().required('Select business type'),
  country: string().required('Select country'),
  businessIndustry: string().required('Select business industry'),
  expenses: string().required('Select average expenses'),
  address: string().required('Provide your address'),
  state: string().required('Select your state'),
  city: string().required('Select your city'),
});
