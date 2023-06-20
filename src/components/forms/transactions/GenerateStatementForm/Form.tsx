import { Form as FormikForm, FormikProps } from 'formik';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
}

export const Form = ({ formikProps, processing }: Props) => {
  const { handleSubmit } = formikProps;

  return (
    <FormikForm onSubmit={handleSubmit}>
      <div className='flex justify-end'>
        <SubmitButton
          id='transfer-to-bank-submit-button'
          submitting={processing}
          className='dark-button ml-auto mt-8 w-full min-w-[120px] 640:w-auto'
        >
          Continue
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
