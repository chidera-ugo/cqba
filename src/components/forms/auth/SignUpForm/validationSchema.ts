import { object, boolean, string } from 'yup';

export const signupPasswordValidation: {
  name: string;
  check: boolean | ((val: string) => boolean);
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
      (val) => {
        for (const { check } of signupPasswordValidation) {
          if (typeof check === 'boolean') return check;
          return check(val);
        }
      }
    ),
  acceptedTerms: boolean().required('Please accept the terms'),
});
