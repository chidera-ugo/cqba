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
  country: '',
  address: '',
  state: '',
  postalCode: '',
  title: {} as MultiCheckValue,
  city: '',
  idNumber: '',
  bvn: '',
};
