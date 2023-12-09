import { Business_typeEnum } from 'enums/business_type.enum';

export type TDocument = {
  name: string;
  id: string;
};

export const companyInformationDocuments: Record<
  Partial<Business_typeEnum>,
  TDocument[]
> = {
  [Business_typeEnum.businessName]: [
    {
      id: 'businessNameCert',
      name: 'Certificate of Business Name',
    },
    {
      id: 'cacBn1',
      name: 'CAC BN / 1 Form',
    },
    {
      id: 'utilityBill',
      name: 'Proof of Address',
    },
  ],
  [Business_typeEnum.trustees]: [
    {
      id: 'catItForm',
      name: 'Form CAC IT / 1',
    },
    {
      id: 'constitution',
      name: 'Constitution',
    },
    {
      id: 'incorporationCert',
      name: 'Certificate of Incorporation',
    },
    {
      id: 'utilityBill',
      name: 'Proof of Business Address',
    },
  ],
  [Business_typeEnum.private]: [
    {
      id: 'cacSeven',
      name: 'Form CAC 1.1 / Status Report',
    },
    {
      id: 'incorporationCert',
      name: 'Certificate of Incorporation',
    },
    {
      id: 'memorandum',
      name: 'Memorandum and Articles of Association',
    },
    {
      id: 'utilityBill',
      name: 'Proof of Business Address',
    },
  ],
  [Business_typeEnum.public]: [
    {
      id: 'cacSeven',
      name: 'Form CAC 1.1 / Status Report',
    },
    {
      id: 'incorporationCert',
      name: 'Certificate of Incorporation',
    },
    {
      id: 'memorandum',
      name: 'Memorandum and Articles of Association',
    },
    {
      id: 'utilityBill',
      name: 'Proof of Address',
    },
  ],
  [Business_typeEnum.individual]: [
    {
      id: 'nationalId',
      name: 'Valid Identity Card',
    },
    {
      id: 'utilityBill',
      name: 'Proof of Address',
    },
  ],
};
