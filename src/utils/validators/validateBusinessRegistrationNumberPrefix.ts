import { Business_typeEnum } from 'enums/business_type.enum';
import { string } from 'yup';

export function validateBusinessRegistrationNumberPrefix(fieldName: string) {
  return string()
    .test('isRequired', `Please provide your ${fieldName}`, (val, ctx) => {
      const businessType = ctx.parent?.companyType as Business_typeEnum;

      const key = ctx.path;

      if (businessType === Business_typeEnum.individual) return true;

      if (
        key === 'businessNumber' &&
        businessType === Business_typeEnum.businessName &&
        !val
      )
        return false;

      if (key === 'rcNumber' && !val) {
        if (
          businessType === Business_typeEnum.private ||
          businessType === Business_typeEnum.public
        )
          return false;
        return true;
      }

      if (
        key === 'cacItNumber' &&
        businessType === Business_typeEnum.trustees &&
        !val
      )
        return false;

      return true;
    })
    .test(
      'startsWithPrefix',
      `Must start with ${businessRegistrationNumberPrefixes
        .slice(0, businessRegistrationNumberPrefixes.length - 1)
        .join(', ')} or ${
        businessRegistrationNumberPrefixes[
          businessRegistrationNumberPrefixes.length - 1
        ]
      }`,
      (val) => {
        if (!val) return true;

        for (const key in businessRegistrationNumberPrefixes) {
          const initial = businessRegistrationNumberPrefixes[key] as string;

          if (val?.startsWith(initial)) return true;
        }

        return false;
      }
    );
}

export const businessRegistrationNumberPrefixes = [
  'RC',
  'BN',
  'IT',
  'LP',
  'LPP',
];
