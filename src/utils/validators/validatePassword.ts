import { passwordValidation } from 'constants/validation/password_validation';

export function validatePassword(val: string) {
  for (const { check } of passwordValidation) {
    if (!check(val)) return false;
  }

  return true;
}
