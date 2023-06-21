import { Input } from 'components/form-elements/Input';
import { Form as FormikForm, FormikProps } from 'formik';
import { useScrollToFormError } from 'hooks/forms/useScrollToFormError';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { Dispatch, SetStateAction } from 'react';
import { PhoneNumberInput } from 'components/form-elements/PhoneNumberInput';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
  setHasUnsavedChanges: Dispatch<SetStateAction<boolean>>;
}

export const Form = ({
  processing,
  formikProps,
  setHasUnsavedChanges,
}: Props) => {
  const { handleSubmit, setFieldValue, errors, submitCount } = formikProps;

  useScrollToFormError(errors, submitCount);

  // const v = values as any;

  // useEffect(() => {
  //   if (!data) return;
  //
  //   const {
  //     dob,
  //     idImageUrl,
  //     formOfId,
  //     bvn,
  //     phone,
  //     firstName,
  //     lastName,
  //     idNumber,
  //     gender,
  //     politicalAffiliation,
  //   } = sanitizeRecordToRemoveUndefinedAndNulls(data);
  //
  //   const _dob = dayjs(dob);
  //
  //   setValues({
  //     ...values,
  //     dateOfBirth: {
  //       value: _dob.toISOString(),
  //       calendarValue: _dob.toDate(),
  //     },
  //     idFile: {
  //       ...values.idFile,
  //       webUrl: idImageUrl,
  //     },
  //     politicalAffiliation,
  //     firstName,
  //     lastName,
  //     gender,
  //     bvn,
  //     idNumber,
  //     phoneNumber: formatPhoneNumber(phone),
  //     idType: formOfId,
  //   });
  // }, [data]);

  return (
    <FormikForm
      onChange={() => {
        setHasUnsavedChanges(true);
      }}
      onSubmit={handleSubmit}
    >
      <div className='gap-4 880:flex'>
        <Input autoFocus label='First Name' name='firstName' />
        <Input label='Last Name' name='lastName' />
      </div>

      <PhoneNumberInput
        label='Phone Number'
        name='phoneNumber'
        setFieldValue={setFieldValue}
        inputMode='tel'
        shouldValidate
      />

      <Input label='Email' name='email' />

      <div className='relative mt-10 flex justify-end pb-8'>
        <SubmitButton
          submitting={processing}
          className='dark-button min-w-[200px]'
        >
          Add Employee
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
