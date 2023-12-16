import { AlternateCheckInput } from 'components/form-elements/AlternateCheckInput';
import { SecondaryActionButton } from 'components/form-elements/CustomSelect/SecondaryActionButton';
import { MultiSelect } from 'components/form-elements/MultiSelect';
import { AddBudgetBeneficiariesFormRecoveryValues } from 'components/forms/budgeting/AddBudgetBeneficiariesForm/index';
import { FieldArray, Form as FormikForm, FormikProps } from 'formik';
import { useGetBudgetBeneficiaries } from 'hooks/api/employees/useGetBudgetBeneficiaries';
import { useEffect } from 'react';
import { formatAmount, sanitizeAmount } from 'utils/formatters/formatAmount';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { AmountInput } from 'components/form-elements/AmountInput';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  recoveryValues?: AddBudgetBeneficiariesFormRecoveryValues;
  inviteEmployee: () => void;
  currency: string;
}

export const Form = ({
  formikProps,
  recoveryValues,
  inviteEmployee,
  currency,
}: Props) => {
  const { handleSubmit, setFieldValue, setValues, values } = formikProps;

  useEffect(() => {
    if (!recoveryValues) return;

    setValues({
      ...values,
      ...recoveryValues,
    });
  }, [recoveryValues]);

  const { isLoading, isRefetching, isError, refetch, data } =
    useGetBudgetBeneficiaries();

  const selectedUsers = data?.filter(({ _id }) => {
    return values.beneficiaries[_id];
  });

  const budgetAmount = Number(
    sanitizeAmount({
      value: values.budgetAmount,
      returnTrueAmount: true,
    })
  );

  return (
    <FormikForm onSubmit={handleSubmit}>
      <MultiSelect
        id={'select_beneficiaries'}
        className='mt-0'
        isLoading={isLoading || isRefetching}
        {...{
          isError,
          refetch,
          setFieldValue,
        }}
        entity={'beneficiary'}
        trueValueKey={'id'}
        displayValueKey={'name'}
        label='Beneficiaries'
        placeholder={'Select beneficiaries'}
        name={'beneficiaries'}
        options={
          data
            ?.filter(({ firstName, lastName }) => {
              return !!firstName && !!lastName;
            })
            ?.map(({ _id, firstName, lastName }) => {
              return {
                name: `${firstName} ${lastName}`,
                id: _id,
              };
            }) ?? []
        }
        itemCountAdjustment={1}
      >
        <SecondaryActionButton
          className={'x-between w-full p-3'}
          onClick={inviteEmployee}
          text={'Invite People'}
        />
      </MultiSelect>

      {selectedUsers && selectedUsers.length > 1 && (
        <AlternateCheckInput
          name={'splittingRules'}
          label={'Set splitting rules'}
          description={`Define the budget allocation and indicate how much your beneficiary will be able to use`}
        />
      )}

      <div className='card mt-5 rounded-xl p-5'>
        <div className={'text-xs text-neutral-500'}>Budget Allocation</div>
        <div className='mt-2 block text-xl font-semibold'>
          {`${currency} ${values.budgetAmount}`}
        </div>
      </div>

      {values.splittingRules && selectedUsers && selectedUsers?.length > 1 && (
        <FieldArray name={'allocations'}>
          {({ form: { errors, touched } }) => {
            const error =
              typeof errors.allocations === 'string' && touched?.allocations
                ? errors.allocations
                : '';

            return (
              <>
                {selectedUsers?.map(({ firstName, lastName, _id }) => {
                  return (
                    <AmountInput
                      key={_id}
                      label={`${firstName} ${lastName}`}
                      name={`allocations.${_id}`}
                      handleChange={(value) => {
                        const amount = Number(
                          sanitizeAmount({
                            value,
                            returnTrueAmount: true,
                          })
                        );

                        const usersToPrefillAmountFor = selectedUsers.filter(
                          (user) => user._id !== _id
                        );

                        const remainder = budgetAmount - amount;

                        if (!usersToPrefillAmountFor?.length) return;

                        const prefillAmount =
                          remainder / usersToPrefillAmountFor?.length;

                        for (const user of usersToPrefillAmountFor) {
                          setFieldValue(
                            `allocations.${user._id}`,
                            formatAmount({
                              value: prefillAmount <= 0 ? 0 : prefillAmount,
                            })
                          );
                        }
                      }}
                      currency='NGN'
                      setFieldValue={setFieldValue}
                      showRedBorders={!!error}
                    />
                  );
                })}

                {!!error && (
                  <div className='mt-3 block text-right text-sm text-red-500'>
                    {error}
                  </div>
                )}
              </>
            );
          }}
        </FieldArray>
      )}

      <div className='mt-8 flex'>
        <SubmitButton className='primary-button w-full min-w-[120px] 640:w-auto'>
          Continue
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
