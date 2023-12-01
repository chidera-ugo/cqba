import { AlternateCheckInput } from 'components/form-elements/AlternateCheckInput';
import { Select } from 'components/form-elements/Select';
import { TextArea } from 'components/form-elements/Textarea';
import { CreateBudgetFormRecoveryValues } from 'components/forms/budgeting/CreateBudgetForm/index';
import { Form as FormikForm, FormikProps } from 'formik';
import { useEffect } from 'react';
import { initialValues } from './initialValues';
import dayjs from 'dayjs';
import { DatePicker } from 'components/form-elements/DatePicker';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { Input } from 'components/form-elements/Input';
import { AmountInput } from 'components/form-elements/AmountInput';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
  recoveryValues?: CreateBudgetFormRecoveryValues;
  currency?: string;
  isOwner?: boolean;
}

export const Form = ({
  formikProps,
  currency,
  recoveryValues,
  processing,
  isOwner,
}: Props) => {
  const { handleSubmit, setValues, setFieldValue, values } = formikProps;

  useEffect(() => {
    if (!recoveryValues) return;

    setValues({
      ...values,
      ...recoveryValues,
    });
  }, [recoveryValues]);

  return (
    <FormikForm onSubmit={handleSubmit}>
      <Input
        label='Budget Title'
        lazyFocus
        placeholder={'Add title'}
        name='title'
      />

      <TextArea
        label={'Description'}
        name={'description'}
        placeholder={'Add description'}
      />

      <AmountInput
        label='Budget Amount'
        name='amount'
        currency={currency}
        setFieldValue={setFieldValue}
      />

      {isOwner && (
        <>
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
        </>
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

      {!isOwner && (
        <Select
          placeholder={'Select priority'}
          trueValueKey={'value'}
          displayValueKey={'title'}
          options={[
            { title: 'Low', value: 1 },
            { title: 'Medium', value: 2 },
            { title: 'High', value: 3 },
          ]}
          name={'priority'}
          label={'Priority'}
        />
      )}

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
