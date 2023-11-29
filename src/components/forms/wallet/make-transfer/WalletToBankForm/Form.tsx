import { SecondaryActionButton } from 'components/form-elements/CustomSelect/SecondaryActionButton';
import { Input } from 'components/form-elements/Input';
import { Select } from 'components/form-elements/Select';
import { Institution } from 'components/forms/wallet/make-transfer/WalletToBankForm/index';
import { WalletToBankFormRecoveryValues } from 'components/modules/wallet/MakeTransfer/PerformWalletToBank';
import { Form as FormikForm, FormikProps } from 'formik';
import { useGetAllBudgetsUnpaginated } from 'hooks/api/budgeting/useGetAllBudgets';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
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
}

export const Form = ({
  formikProps,
  institutions,
  createBudget,
  formRecoveryValues,
}: Props) => {
  const { primaryWallet } = useManageWallets();

  const { handleSubmit, setFieldValue, setValues, values } = formikProps;

  const { isLoading, isRefetching, isError, data } =
    useGetAllBudgetsUnpaginated();

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
    if (!values.budget) return;

    setFieldValue(
      'budgetBalance',
      Number(
        data?.docs.find(({ _id }) => _id === values.budget)!.availableAmount
      ) / 100
    );
  }, [values.budget]);

  return (
    <FormikForm onSubmit={handleSubmit}>
      <Select
        options={
          data?.docs.map(({ name, _id, availableAmount }) => ({
            name: `${name} - ${primaryWallet.currency} ${formatAmount({
              value: availableAmount / 100,
            })}`,
            availableAmount,
            _id,
          })) ?? []
        }
        isError={isError}
        isLoading={isLoading || isRefetching}
        className={'mt-0'}
        displayValueKey={'name'}
        next={'amount'}
        trueValueKey={'_id'}
        name={'budget'}
        label={'Budget Category'}
      />
      <div className='mt-3 flex'>
        <SecondaryActionButton
          onClick={createBudget}
          text={'Create New Budget'}
        />
      </div>

      <AmountInput
        label='Amount'
        name='amount'
        currency='NGN'
        setFieldValue={setFieldValue}
      />
      <GetTransactionFee
        amount={values.amount}
        minimumAmount={10}
        transactionType='other-bank-transfer'
        getValue={(val) => setFieldValue('fee', val)}
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
