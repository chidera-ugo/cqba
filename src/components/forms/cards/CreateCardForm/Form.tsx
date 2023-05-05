import { Input } from 'components/form-elements/Input';
import { Form as FormikForm, FormikProps } from 'formik';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { AmountInput } from 'components/form-elements/AmountInput';
import { GetTransactionFee } from 'components/forms/wallet/common/GetTransactionFee';
import { useState } from 'react';
import { CustomSelect } from 'components/form-elements/CustomSelect';
import { SubAccount } from 'types/wallet/FundWallet';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
  subAccounts: SubAccount[];
}

export const Form = ({ processing, subAccounts, formikProps }: Props) => {
  const { handleSubmit, setFieldValue, values } = formikProps;
  const [isProcessing, setIsProcessing] = useState({
    fee: false,
  });

  return (
    <FormikForm onSubmit={handleSubmit}>
      <Input label='Card Name' name='cardName' className='mt-0' />

      <CustomSelect
        id='card-owner'
        label='Owner'
        name='owner'
        entity='account'
        next='amount'
        displayValueKey='accountName'
        trueValueKey='accountNumber'
        {...{
          setFieldValue,
          options: subAccounts,
        }}
      />

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

      <div className='flex justify-end'>
        <SubmitButton
          id='create-card-submit-button'
          submitting={processing}
          disabled={!values.fee || isProcessing['fee']}
          className='dark-button ml-auto mt-8 w-full min-w-[120px] 640:w-auto'
        >
          Create
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
