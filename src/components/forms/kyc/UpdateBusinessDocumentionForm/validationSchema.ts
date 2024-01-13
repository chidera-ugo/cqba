import { companyInformationDocuments } from 'constants/kyc/company_information_documents';
import { Business_typeEnum } from 'enums/business_type.enum';
import { validateFile } from 'utils/validators/validateField';
import { object } from 'yup';

export function validationSchema(businessType?: Business_typeEnum) {
  const spec: Record<string, any> = {};

  for (const item of companyInformationDocuments?.[
    businessType ?? Business_typeEnum.individual
  ]) {
    spec[item?.id] = object().test(
      'invalidFile',
      `Upload ${item.name}`,
      (val) => validateFile(val)
    );
  }

  return object(spec);
}
