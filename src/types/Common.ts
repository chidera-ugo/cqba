export interface IFile {
  file?: File;
  url?: string;
  id: string;
}

export interface Field {
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  capitalizeLabel?: boolean;
  fieldType?:
    | 'idNumber'
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
  setFile: (value: IFile) => void;
  file: IFile | null;
  extensions?: string[];
}
