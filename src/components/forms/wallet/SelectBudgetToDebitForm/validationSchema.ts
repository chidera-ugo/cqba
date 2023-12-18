import { object, string } from 'yup';

export const validationSchema = (isProject: boolean) => {
  return object({
    budgetId: string().required('Please select a budget'),
    projectId: string().test('required', 'Please select a project', (val) => {
      if (!isProject) return true;
      return !!val;
    }),
  });
};
