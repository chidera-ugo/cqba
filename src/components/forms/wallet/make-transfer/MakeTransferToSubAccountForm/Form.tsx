import { Input } from 'components/form-elements/Input';
import { Form as FormikForm, FormikProps } from 'formik';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { AmountInput } from 'components/form-elements/AmountInput';
import { SubAccount } from 'types/wallet/FundWallet';
import { GetTransactionFee } from 'components/forms/wallet/common/GetTransactionFee';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { MultiSelect } from 'components/form-elements/MultiSelect';
import { SolidCirclePlus } from 'components/svgs/forms/Plus';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
  subAccounts: SubAccount[];
}

export const Form = ({ processing, formikProps, subAccounts }: Props) => {
  const { handleSubmit, setFieldValue, values } = formikProps;
  const [isProcessing, setIsProcessing] = useState({
    fee: false,
  });

  const { push } = useRouter();

  return (
    <FormikForm onSubmit={handleSubmit}>
      <MultiSelect
        id='sub-accounts'
        label='Sub Account(s)'
        name='subAccounts'
        entity='Account(s)'
        next='amount'
        displayValueKey='accountName'
        otherInfoKey='accountNumber'
        trueValueKey='accountNumber'
        className='mt-0'
        {...{
          setFieldValue,
          options: subAccounts,
        }}
        itemCountAdjustment={1}
      >
        <button
          onClick={() => push('/sub-accounts?_a=new')}
          className='x-between group w-full py-4 px-4 text-primary-main hover:text-black'
        >
          <span className='my-auto font-semibold group-hover:underline'>
            Add sub account
          </span>
          <span className='my-auto'>
            <SolidCirclePlus />
          </span>
        </button>
      </MultiSelect>

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

      <Input label='Narration (Optional)' name='narration' className='w-full' />

      <div className='flex justify-end'>
        <SubmitButton
          id='transfer-to-bank-submit-button'
          submitting={processing}
          disabled={!values.fee || isProcessing['fee']}
          className='dark-button ml-auto mt-8 w-full min-w-[120px] 640:w-auto'
        >
          Continue
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
