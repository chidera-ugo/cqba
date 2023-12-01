import { SubmitButton } from 'components/form-elements/SubmitButton';
import { TextArea } from 'components/form-elements/Textarea';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';

interface Props {
  proceed: (reason: string) => void;
  processing?: boolean;
}

export const RejectionReasonForm = ({ proceed, processing }: Props) => {
  return (
    <Formik
      initialValues={{
        reason: '',
      }}
      validationSchema={object({
        reason: string().trim().required('Please provide rejection reason'),
      })}
      onSubmit={({ reason }) => {
        proceed(reason);
      }}
      validateOnBlur={false}
    >
      {({ handleSubmit }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <TextArea lazyFocus label={'Reason'} name={'reason'} />

            <SubmitButton
              submitting={processing}
              className='primary-button mx-auto mt-6 w-[100px] text-sm'
            >
              Continue
            </SubmitButton>
          </Form>
        );
      }}
    </Formik>
  );
};
