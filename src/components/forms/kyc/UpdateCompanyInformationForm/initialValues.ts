import { addressInitialValues } from 'constants/kyc/address_initial_values';
import { Business_typeEnum } from 'enums/business_type.enum';
import { DatePickerValue } from 'types/commons';

export const initialValues = {
  businessName: '',
  phoneNumber: '',
  postalCode: '',
  companyType: '' as Business_typeEnum,
  businessIndustry: '',
  tin: '',
  businessNumber: '',
  rcNumber: '',
  cacItNumber: '',
  creationDate: {} as DatePickerValue,
  ...addressInitialValues,
};
