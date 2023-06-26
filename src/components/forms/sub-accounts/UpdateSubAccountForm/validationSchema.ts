import { object, string } from 'yup';

export const validationSchema = object({
  departmentId: string().required('Please select a department'),
  employeeId: string().required('Please select an employee'),
});
