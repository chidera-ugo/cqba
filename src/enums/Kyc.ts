export enum IdTypes {
  NIN = 'NIN Card',
  NIN_SLIP = 'NIN Slip',
  DRIVERS_LICENCE = "Driver's License",
  VOTER_ID = "Voter's Card",
  INTERNATIONAL_PASSPORT = 'International Passport',
}

export type IdType = keyof typeof IdTypes;
