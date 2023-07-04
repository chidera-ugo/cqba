import { Input } from 'components/form-elements/Input';
import { Form as FormikForm, FormikProps } from 'formik';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
}

export const Form = ({ processing, formikProps }: Props) => {
  const { handleSubmit } = formikProps;

  return (
    <FormikForm onSubmit={handleSubmit}>
      <Input label='Category Name' autoFocus name='categoryName' />

      <SubmitButton
        submitting={processing}
        className='dark-button mt-4 mb-8 w-full'
      >
        Add Category
      </SubmitButton>
    </FormikForm>
  );
};
