import { Business_typeEnum } from 'enums/business_type.enum';
import { validateBusinessRegistrationNumberPrefix } from 'utils/validators/validateBusinessRegistrationNumberPrefix';
import { phoneNumberTest } from 'utils/validators/validateField';
import { object, string } from 'yup';

export const validationSchema = object({
  tin: string().test(
    'isRequired',
    'Please provide your tax identification number',
    (val, ctx) => {
      const businessType = ctx.parent?.companyType as Business_typeEnum;

      if (
        (businessType === Business_typeEnum.private ||
          businessType === Business_typeEnum.public) &&
        !val
      )
        return false;

      return true;
    }
  ),
  rcNumber: validateBusinessRegistrationNumberPrefix('RC Number'),
  cacItNumber: validateBusinessRegistrationNumberPrefix('CAC/IT Number'),
  businessNumber: validateBusinessRegistrationNumberPrefix('Business Number'),
  businessName: string().required('Provide your company name'),
  companyType: string().required('Select business type'),
  country: string().required('Select country'),
  businessIndustry: string().required('Select business industry'),
  address: string().required('Provide your address'),
  state: string().required('Select your state'),
  city: string().required('Select your city'),
  postalCode: string().required('Provide postal code'),
  phoneNumber: string()
    .required('Please provide phone number')
    .test('invalidNumber', 'Provide a valid phone number', (val) =>
      phoneNumberTest(val)
    ),
});
