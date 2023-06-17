import { FormikErrors } from 'formik';
import { useEffect } from 'react';

export const useScrollToFormError = <T>(
  errors: FormikErrors<T>,
  submitCount: number
) => {
  useEffect(() => {
    if (submitCount < 1) return;

    const firstError = Object.keys(errors)[0];

    if (!firstError) return;

    const el = document.getElementById(firstError);

    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [submitCount]);
};
