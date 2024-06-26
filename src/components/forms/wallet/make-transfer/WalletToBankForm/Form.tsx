import { SecondaryActionButton } from 'components/form-elements/CustomSelect/SecondaryActionButton';
import { Input } from 'components/form-elements/Input';
import { Select } from 'components/form-elements/Select';
import { Institution } from 'components/forms/wallet/make-transfer/WalletToBankForm/index';
import { ActiveBudgetCard } from 'components/modules/budgeting/ActiveBudgetCard';
import { WalletToBankFormRecoveryValues } from 'components/modules/wallet/MakeTransfer/PerformWalletToBank';
import { Form as FormikForm, FormikProps } from 'formik';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { useGetDebitableBudgets } from 'hooks/api/budgeting/useGetDebitableBudgets';
import { formatAmount } from 'utils/formatters/formatAmount';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { CustomSelect } from 'components/form-elements/CustomSelect';
import { AmountInput } from 'components/form-elements/AmountInput';
import { ResolveAccountNumber } from 'components/forms/wallet/common/ResolveAccountNumber';
import { GetTransactionFee } from 'components/forms/wallet/common/GetTransactionFee';
import { useEffect, useState } from 'react';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  institutions: Institution[];
  createBudget: () => void;
  formRecoveryValues: WalletToBankFormRecoveryValues;
  currency: string;
  budget?: IBudget;
}

export const Form = ({
  formikProps,
  institutions,
  createBudget,
  formRecoveryValues,
  currency,
  budget,
}: Props) => {
  const { handleSubmit, setFieldValue, setValues, values } = formikProps;

  const { isLoading, isRefetching, isError, data } = useGetDebitableBudgets();

  const [isProcessing, setIsProcessing] = useState({
    fee: false,
    accountName: false,
  });

  useEffect(() => {
    if (!formRecoveryValues) return;

    setValues({
      ...values,
      ...formRecoveryValues,
    });
  }, [formRecoveryValues]);

  useEffect(() => {
    if (!budget) return;

    setFieldValue('budget', budget._id);

    setFieldValue('budgetBalance', budget.amount / 100);
  }, [budget]);

  useEffect(() => {
    if (!values.budget || !!budget) return;

    const budgetBalance =
      Number(data?.find(({ _id }) => _id === values.budget)?.balance) / 100;

    setFieldValue('budgetBalance', budgetBalance);
  }, [values.budget, data]);

  const budgets =
    data?.map(({ name, _id, balance }) => ({
      name: `${name} - ${currency} ${formatAmount({
        value: balance / 100,
      })}`,
      balance: balance,
      _id,
    })) ?? [];

  return (
    <FormikForm onSubmit={handleSubmit}>
      {budget ? (
        <div className='mt-8'>
          <ActiveBudgetCard showOnlyBreakdown {...budget} />
        </div>
      ) : (
        <>
          <Select
            options={budgets}
            isError={isError}
            isLoading={isLoading || (isRefetching && !budgets.length)}
            className={'mt-0'}
            displayValueKey={'name'}
            next={'amount'}
            trueValueKey={'_id'}
            name={'budget'}
            label={'Budget Category'}
          />
          <div className='mt-3 flex w-fit'>
            <SecondaryActionButton
              onClick={createBudget}
              text={'Create New Budget'}
            />
          </div>
        </>
      )}

      <AmountInput
        label='Amount'
        name='amount'
        lazyFocus={!!budget}
        currency={currency}
        setFieldValue={setFieldValue}
      />
      <GetTransactionFee
        amount={values.amount}
        budgetId={values.budget}
        currency={currency}
        minimumAmount={10}
        emitValue={(val) => setFieldValue('fee', val)}
        emitIsProcessing={(val) =>
          setIsProcessing((prev) => ({
            ...prev,
            fee: val,
          }))
        }
      />

      <CustomSelect
        id='recipients-bank'
        label="Recipient's Bank"
        name='bank'
        entity='Bank'
        next='accountNumber'
        displayValueKey='bankName'
        trueValueKey='bankCode'
        className='mt-0'
        {...{
          setFieldValue,
          options: institutions,
        }}
      />

      <Input
        label='Account Number'
        name='accountNumber'
        className='w-full'
        setFieldValue={setFieldValue}
        type='text'
        inputMode='tel'
        autoComplete='off'
        fieldType='idNumber'
        limit={10}
        shouldValidate
      />
      <ResolveAccountNumber
        accountNumber={values.accountNumber}
        bankCode={values.bank}
        getValue={(val) => setFieldValue('accountName', val)}
        emitIsProcessing={(val) =>
          setIsProcessing((prev) => ({
            ...prev,
            accountName: val,
          }))
        }
      />

      <SubmitButton
        disabled={
          !values.accountName ||
          !values.fee ||
          isProcessing['fee'] ||
          isProcessing['accountName']
        }
        className='primary-button mt-8 w-full min-w-[120px] 640:w-auto'
      >
        Continue
      </SubmitButton>
    </FormikForm>
  );
};
