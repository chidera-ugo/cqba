export interface IFile {
  file?: File;
  url?: string;
  base64Url?: string;
  webUrl?: string;
  id: string;
}

export type SetFieldValue = (
  field: string,
  value: any,
  shouldValidate?: boolean | undefined
) => void;

export type DatePickerValue = {
  value: string;
  calendarValue: Date | null;
};

export interface Field {
  setFieldValue?: SetFieldValue;
  capitalizeLabel?: boolean;
  fieldType?:
    | 'idNumber'
    | 'phoneNumber'
    | 'idNumberWithSlashes'
    | 'name'
    | 'dateOfBirth'
    | 'fullName'
    | 'age'
    | 'text'
    | 'card'
    | '11DigitPhone'
    | 'expiryDate';
  limit?: number;
  shouldValidate?: boolean;
  // Next field to focus
  next?: string;
  label?: string;
}

export interface FileField {
  id?: string;
  maximumFileSizeInMB?: number;
  setFieldValue: SetFieldValue;
  file?: IFile | null;
  getFile?: (id: string) => IFile | null;
  extensions?: string[];
}
