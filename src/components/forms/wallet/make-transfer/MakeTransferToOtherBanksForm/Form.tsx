import { Input } from 'components/form-elements/Input';
import { Form as FormikForm, FormikProps } from 'formik';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { CustomSelect } from 'components/form-elements/CustomSelect';
import { AmountInput } from 'components/form-elements/AmountInput';
import { Institution } from 'types/wallet/FundWallet';
import { ResolveAccountNumber } from 'components/forms/wallet/common/ResolveAccountNumber';
import { GetTransactionFee } from 'components/forms/wallet/common/GetTransactionFee';
import { useState } from 'react';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
  institutions: Institution[];
}

export const Form = ({ processing, formikProps, institutions }: Props) => {
  const { handleSubmit, setFieldValue, values } = formikProps;
  const [isProcessing, setIsProcessing] = useState({
    fee: false,
    accountName: false,
  });

  return (
    <FormikForm onSubmit={handleSubmit}>
      <CustomSelect
        id='recipients-bank'
        label="Recipient's Bank"
        name='bank'
        entity='Bank'
        next='accountNumber'
        displayValueKey='name'
        trueValueKey='code'
        className='mt-0'
        {...{
          setFieldValue,
          options: institutions,
        }}
      />

      <Input
        label='Account Number'
        name='accountNumber'
        next='amount'
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
          id='transfer-to-bank-submit-button'
          submitting={processing}
          disabled={
            !values.accountName ||
            !values.fee ||
            isProcessing['fee'] ||
            isProcessing['accountName']
          }
          className='dark-button ml-auto mt-8 w-full min-w-[120px] 640:w-auto'
        >
          Continue
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
