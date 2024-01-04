import { addressInitialValues } from 'constants/kyc/address_initial_values';
import { DatePickerValue } from 'types/commons';
import { MultiCheckValue } from 'utils/validators/validateMultiCheckValues';

export const initialValues = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  dateOfBirth: {} as DatePickerValue,
  idType: '',
  percentOwned: '',
  email: '',
  postalCode: '',
  title: {} as MultiCheckValue,
  idNumber: '',
  bvn: '',
  ...addressInitialValues,
};
