import { Form as FormikForm, FormikProps } from 'formik';
import { initialValues } from './initialValues';
import dayjs from 'dayjs';
import { useState } from 'react';
import { DatePicker } from 'components/form-elements/DatePicker';
import { SubmitButton } from 'components/form-elements/SubmitButton';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
}

export const Form = ({ formikProps, processing }: Props) => {
  const { handleSubmit, setFieldValue } = formikProps;

  const [fromCalendarValue, setFromCalendarValue] = useState<Date | null>(null);
  const [toCalendarValue, setToCalendarValue] = useState<Date | null>(null);

  return (
    <FormikForm onSubmit={handleSubmit}>
      <DatePicker
        label='Start Date'
        name='fromDate'
        {...{
          calendarValue: fromCalendarValue,
          setCalendarValue: setFromCalendarValue,
        }}
        maxDate={dayjs().subtract(1, 'day').toDate()}
        minDate={dayjs().subtract(1, 'year').toDate()}
        setDate={(value) => {
          setFieldValue('fromDate', value);
        }}
      />

      <DatePicker
        label='End Date'
        name='toDate'
        disabled={!fromCalendarValue}
        {...{
          calendarValue: toCalendarValue,
          setCalendarValue: setToCalendarValue,
        }}
        minDate={dayjs(fromCalendarValue).add(1, 'day').toDate()}
        maxDate={dayjs().toDate()}
        setDate={(value) => {
          setFieldValue('toDate', value);
        }}
      />

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
