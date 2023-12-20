import { ChangeEvent } from 'react';
import {
  name,
  number,
  fullName,
  phoneNumberRegex,
  phoneNumberRegex11,
} from 'utils/regexes';
import { Field } from 'types/commons';
import { formatDateOfBirth } from 'utils/formatters/formatDateOfBirth';

export const validateField = (
  e: ChangeEvent<HTMLInputElement>,
  setFieldValue: Field['setFieldValue'],
  fieldType: Field['fieldType'],
  fieldName: string,
  limit?: number,
  shouldValidate?: boolean
) => {
  if (setFieldValue) {
    const val = e.target.value;

    if (fieldType === 'age') {
      if (number.test(val) || val === '')
        if (limit && val?.length <= limit) {
          setFieldValue(fieldName, val);
        }
      return;
    }

    if (fieldType === 'idNumberWithSlashes') {
      if (shouldValidate) {
        const trimmedValue = val.trim().split(' ').join('');

        const _val = trimmedValue.replace('/', '');

        if (number.test(_val) || val === '') {
          if (!limit) setFieldValue(fieldName, _val);
          else if (limit && _val?.length <= limit) {
            setFieldValue(fieldName, _val);
          }
        }
      } else {
        setFieldValue(fieldName, val);
      }
      return;
    }

    if (fieldType === 'dateOfBirth') {
      const _val = val.split('/').join('');
      if (number.test(_val) || _val === '')
        if (limit && _val?.length <= limit) {
          setFieldValue(fieldName, formatDateOfBirth(val));
        }
      return;
    }

    if (fieldType === 'phoneNumber') {
      if (shouldValidate) {
        const trimmedValue = val.trim().split(' ').join('');

        const _val = trimmedValue.startsWith('+234')
          ? trimmedValue.replace('+234', '0')
          : trimmedValue.startsWith('234')
          ? trimmedValue.replace('234', '0')
          : trimmedValue;

        if (number.test(_val) || val === '') {
          if (!limit) {
            setFieldValue(fieldName, _val);
          } else if (limit && _val?.length <= limit) {
            setFieldValue(fieldName, _val);
          }
        }
      } else {
        if (number.test(val) || val === '') setFieldValue(fieldName, val);
      }
      return;
    }

    if (fieldType === 'idNumber') {
      if (shouldValidate) {
        const _val = val.trim().split(' ').join('');

        if (number.test(_val) || val === '') {
          if (!limit) {
            setFieldValue(fieldName, _val);
          } else if (limit && _val?.length <= limit) {
            setFieldValue(fieldName, _val);
          }
        }
      } else {
        if (number.test(val) || val === '') setFieldValue(fieldName, val);
      }
      return;
    }

    if (fieldType === '11DigitPhone') {
      if (shouldValidate) {
        const trimmedValue = val.trim().split(' ').join('');

        const _val = trimmedValue.includes('+234')
          ? trimmedValue.replace('+234', '0')
          : trimmedValue.startsWith('234')
          ? trimmedValue.replace('234', '0')
          : trimmedValue;

        if (number.test(_val) || val === '') {
          if (!limit) setFieldValue(fieldName, _val);
          else if (limit && _val?.length <= limit) {
            setFieldValue(fieldName, _val);
          }
        }
      } else {
        if (number.test(val) || val === '') setFieldValue(fieldName, val);
      }
      return;
    }

    if (fieldType === 'name') {
      if (val?.charAt(0) !== '-')
        if (name.test(val) || val === '')
          setFieldValue(fieldName, val.replace('--', '-'));
      return;
    }

    if (fieldType === 'text') {
      setFieldValue(fieldName, val);
      return;
    }

    if (fieldType === 'fullName')
      if (val?.charAt(0) !== '-')
        if (fullName.test(val) || val === '') {
          setFieldValue(fieldName, val.replace('--', '-').replace('  ', ' '));
        }
  }
};

export function phoneNumberTest(
  val?: string,
  optional?: boolean,
  mustBe11Digits?: boolean
) {
  if (optional && !val) return true;
  if (!val) return false;
  if (val?.charAt(0) === '0' || mustBe11Digits) {
    if (val.length !== 11) return false;
    return phoneNumberRegex11.test(val);
  } else {
    if (val?.length !== 10) return false;
    return phoneNumberRegex.test(val);
  }
}

export function validateFile(val?: any, required?: boolean) {
  if (!val?.file && !required) return true;
  return !!val?.file && !!val?.id && !!val?.url;
}
