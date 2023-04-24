export const decimalRegExp = /^\d*\.?\d*$/;
export const decimalNumber = /^[0-9.]+$/;
export const number = /^[0-9]*$/;
export const name = /^[A-Za-z-]+$/;
export const fullName = /^[A-Za-z- ]+$/;
export const alphaNumeric = /[A-Za-z0-9]/;
export const passwordRegex =
  /^(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[a-z]){1,}).+/;
export const phoneNumberRegex = /([789][01][\d]{8})/;
export const phoneNumberRegex11 = /0([789][01][\d]{8})/;
export const uppercaseRegExp = /^(?=(.*[A-Z]){1,}).+/;
export const numberRegExp = /^(?=(.*[0-9]){1,}).+/;
export const lowercaseRegExp = /^(?=(.*[a-z]){1,}).+/;
export const specialCharRegExp = /^(?=(.*[^A-Za-z0-9]){2,}).+/;
