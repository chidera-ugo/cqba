import { companyInformationDocuments } from 'constants/kyc/company_information_documents';
import { Business_typeEnum } from 'enums/business_type.enum';
import { IFile } from 'types/commons';

export function initialValues(businessType: Business_typeEnum) {
  const record: Record<string, IFile> = {};

  for (const item of companyInformationDocuments[businessType]) {
    record[item?.id] = {} as IFile;
  }

  return record;
}

export type UpdateBusinessDocumentationInitialValues = ReturnType<
  typeof initialValues
>;
