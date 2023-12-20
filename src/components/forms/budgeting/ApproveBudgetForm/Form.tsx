import { AlternateCheckInput } from 'components/form-elements/AlternateCheckInput';
import { Form as FormikForm, FormikProps } from 'formik';
import { useEffect } from 'react';
import { initialValues } from './initialValues';
import dayjs from 'dayjs';
import { DatePicker } from 'components/form-elements/DatePicker';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { AmountInput } from 'components/form-elements/AmountInput';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  currency?: string;
  decline: () => void;
  amount: number;
}

export const Form = ({ formikProps, currency, amount, decline }: Props) => {
  const { handleSubmit, setFieldValue, values } = formikProps;

  useEffect(() => {
    if (!amount) return;

    setFieldValue('amount', String(amount));
  }, [amount]);

  return (
    <FormikForm onSubmit={handleSubmit}>
      <AlternateCheckInput
        name={'threshold'}
        next={'allocation'}
        lazyFocus
        label={'Budget Threshold'}
        description={`This is the maximum you want your team to spend from, in this budget`}
      />

      {values.threshold && (
        <AmountInput
          label='Allocation'
          name='allocation'
          currency={currency}
          setFieldValue={setFieldValue}
        />
      )}

      <AlternateCheckInput
        name={'expires'}
        label={'Set Expiration Date'}
        description={`Delete all funds allocated to beneficiaries and deactivate the budget.`}
      />

      {values.expires && (
        <DatePicker
          label='Due Date'
          name='expiryDate'
          {...{
            setFieldValue,
          }}
          minDate={dayjs().toDate()}
        />
      )}

      <div className='mt-8 flex gap-3'>
        <SubmitButton className={'primary-button'}>Approve Budget</SubmitButton>

        <button onClick={decline} type={'button'} className='secondary-button'>
          Decline Budget
        </button>
      </div>
    </FormikForm>
  );
};
