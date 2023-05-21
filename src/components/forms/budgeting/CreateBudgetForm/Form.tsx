import { Form as FormikForm, FormikProps } from 'formik';
import { initialValues } from './initialValues';
import dayjs from 'dayjs';
import { useState } from 'react';
import { DatePicker } from 'components/form-elements/DatePicker';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { Input } from 'components/form-elements/Input';
import { AmountInput } from 'components/form-elements/AmountInput';
import { Select } from 'components/form-elements/Select';
import { TextArea } from 'components/form-elements/Textarea';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
}

export const Form = ({ formikProps, processing }: Props) => {
  const { handleSubmit, setFieldValue } = formikProps;
  const [dueDate, setDueDate] = useState<Date | null>(null);

  return (
    <FormikForm onSubmit={handleSubmit}>
      <Input label='Budget Title' name='title' />
      <TextArea label='Description' name='description' />

      <div className='gap-4 880:flex'>
        <Select label='Priority' name='priority' options={['High', 'Low']} />
        <DatePicker
          label='Due Date'
          name='dueDate'
          {...{
            calendarValue: dueDate,
            setCalendarValue: setDueDate,
            setFieldValue,
          }}
          minDate={dayjs().toDate()}
        />
      </div>

      <AmountInput
        label='Amount'
        name='amount'
        currency='NGN'
        setFieldValue={setFieldValue}
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
