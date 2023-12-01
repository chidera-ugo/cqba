import { object, string } from 'yup';

export const passwordValidation: {
  name: string;
  check: (val: string) => boolean;
}[] = [
  {
    name: 'Contain at least 8 characters',
    check: (val) => val.length >= 8,
  },
  {
    name: 'Must have at least one lowercase letter',
    check: (val) => val.toUpperCase() !== val,
  },
  {
    name: 'Must have at least one symbol (!@#$%^&*~-_+-)',
    check: (val) => /[!@#$%^&*~_+\-]/.test(val),
  },
  {
    name: 'Must have at least one uppercase letter',
    check: (val) => val.toLowerCase() !== val,
  },
  {
    name: 'Must have at least one number',
    check: (val) => /[0-9]/.test(val),
  },
];

export const validationSchema = object({
  email: string()
    .trim()
    .required('Please provide your email')
    .email('Please provide a valid email'),
  businessName: string().required('Please provide your company name'),
  password: string()
    .trim()
    .required('Please provide new password')
    .test(
      'invalid password',
      'Please fulfill the below requirements',
      validatePassword
    ),
});

export function validatePassword(val: string) {
  for (const { check } of passwordValidation) {
    if (!check(val)) return false;
  }

  return true;
}
