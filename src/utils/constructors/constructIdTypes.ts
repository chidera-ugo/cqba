import { IdType, IdTypes } from 'enums/Kyc';

export function constructIdTypes(): {
  name: IdTypes;
  id: IdType;
}[] {
  const idTypes: IdType[] = [
    'DRIVERS_LICENCE',
    'INTERNATIONAL_PASSPORT',
    'NIN',
    'NIN_SLIP',
    'VOTER_ID',
  ];

  return idTypes.map((type) => ({
    id: type,
    name: IdTypes[type],
  }));
}
