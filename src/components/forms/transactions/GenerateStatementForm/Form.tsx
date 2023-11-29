import { Form as FormikForm, FormikProps } from 'formik';
import { initialValues } from './initialValues';
import dayjs from 'dayjs';
import { DatePicker } from 'components/form-elements/DatePicker';
import { SubmitButton } from 'components/form-elements/SubmitButton';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
}

export const Form = ({ formikProps, processing }: Props) => {
  const { handleSubmit, setFieldValue, values } = formikProps;

  return (
    <FormikForm onSubmit={handleSubmit}>
      <DatePicker
        label='Start Date'
        name='startDate'
        {...{ setFieldValue }}
        maxDate={dayjs().subtract(1, 'day').toDate()}
        minDate={dayjs().subtract(1, 'year').toDate()}
        bottom
      />

      <DatePicker
        label='End Date'
        name='endDate'
        {...{ setFieldValue }}
        disabled={!values.startDate.calendarValue}
        minDate={dayjs(values.startDate.calendarValue).toDate()}
        maxDate={dayjs().toDate()}
      />

      <div className='mt-8 flex'>
        <SubmitButton
          submitting={processing}
          className='primary-button w-full min-w-[120px] 640:w-auto'
        >
          Continue
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
