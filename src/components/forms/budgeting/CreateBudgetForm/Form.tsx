import clsx from 'clsx';
import { AlternateCheckInput } from 'components/form-elements/AlternateCheckInput';
import { Select } from 'components/form-elements/Select';
import { TextArea } from 'components/form-elements/Textarea';
import { CreateBudgetFormRecoveryValues } from 'components/forms/budgeting/CreateBudgetForm/index';
import { Form as FormikForm, FormikProps } from 'formik';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { useEffect } from 'react';
import { DatePickerValue } from 'types/commons';
import { formatAmount } from 'utils/formatters/formatAmount';
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
  budget?: IBudget;
  isProjectCreationFlow?: boolean;
}

export const Form = ({
  formikProps,
  currency,
  isProjectCreationFlow,
  recoveryValues,
  processing,
  isOwner,
  budget,
}: Props) => {
  const { handleSubmit, setValues, setFieldValue, values } = formikProps;

  useEffect(() => {
    if (!recoveryValues) return;

    setValues({
      ...values,
      ...recoveryValues,
    });
  }, [recoveryValues]);

  useEffect(() => {
    if (!budget) return;

    const { amount, expiry, name, description } = budget;

    const expiryDate = new Date(expiry);

    setValues({
      ...values,
      title: name,
      expires: !!expiry,
      expiryDate: !expiry
        ? ({} as DatePickerValue)
        : { value: expiryDate.toISOString(), calendarValue: expiryDate },
      amount: formatAmount({
        value: amount / 100,
      }),
      description,
    });
  }, [budget]);

  return (
    <FormikForm onSubmit={handleSubmit}>
      <Input
        label={`${isProjectCreationFlow ? 'Project' : 'Budget'} Title`}
        lazyFocus
        placeholder={'Add title'}
        name='title'
      />

      {!isOwner && (
        <TextArea
          label={'Description'}
          name={'description'}
          placeholder={'Add description'}
        />
      )}

      <AmountInput
        label={isProjectCreationFlow ? 'Project Budget' : 'Budget Amount'}
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

      {isOwner && (
        <AlternateCheckInput
          name={'expires'}
          label={'Set Expiration Date'}
          description={`Delete all funds allocated to beneficiaries and deactivate the budget.`}
        />
      )}

      <div className={clsx(!isOwner && 'gap-4 880:flex')}>
        {values.expires || !isOwner ? (
          <DatePicker
            label='Due Date'
            name='expiryDate'
            {...{
              setFieldValue,
            }}
            minDate={dayjs().toDate()}
          />
        ) : null}

        {!isOwner && (
          <Select
            placeholder={'Select priority'}
            options={['Low', 'Medium', 'High']}
            name={'priority'}
            label={'Priority'}
          />
        )}
      </div>

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
