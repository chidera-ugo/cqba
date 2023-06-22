import { IsLoading } from 'components/data-states/IsLoading';
import { Input } from 'components/form-elements/Input';
import { ImageViewer } from 'components/modals/ImageViewer';
import { useAppContext } from 'context/AppContext';
import { Form as FormikForm, FormikProps } from 'formik';
import { useGetOrganizationInformation } from 'hooks/api/kyc/useGetOrganizationInformation';
import { useScrollToFormError } from 'hooks/forms/useScrollToFormError';
import { DatePickerValue } from 'types/Common';
import { constructIdTypes } from 'utils/constructors/constructIdTypes';
import { formatPhoneNumber } from 'utils/formatters/formatPhoneNumber';
import { sanitizeRecordToRemoveUndefinedAndNulls } from 'utils/sanitizers/sanitizeRecordToRemoveUndefinedAndNulls';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { Select } from 'components/form-elements/Select';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PhoneNumberInput } from 'components/form-elements/PhoneNumberInput';
import { DatePicker } from 'components/form-elements/DatePicker';
import dayjs from 'dayjs';
import { FileInput } from 'components/form-elements/FileInput';
import { RadioInput } from 'components/form-elements/RadioInput';

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
  const {
    handleSubmit,
    setValues,
    setFieldValue,
    errors,
    submitCount,
    values,
  } = formikProps;

  const { isLoading, data } = useGetOrganizationInformation();
  const [previewImageUrl, setPreviewImageUrl] = useState('');

  const { user } = useAppContext().state;

  useScrollToFormError(errors, submitCount);

  const v = values as any;

  useEffect(() => {
    if (!data) return;

    const {
      dob,
      idImageUrl,
      formOfId,
      bvn,
      phone,
      firstName,
      lastName,
      idNumber,
      gender,
      politicalAffiliation,
    } = sanitizeRecordToRemoveUndefinedAndNulls(data);

    const _dob = !!dob ? dayjs(dob) : '';

    setValues({
      ...values,
      dateOfBirth:
        !!dob && !!_dob
          ? {
              value: _dob.toISOString(),
              calendarValue: _dob.toDate(),
            }
          : ({} as DatePickerValue),
      idFile: {
        ...values.idFile,
        webUrl: idImageUrl,
      },
      politicalAffiliation: !politicalAffiliation
        ? ''
        : politicalAffiliation
        ? 'Yes'
        : 'No',
      firstName: firstName ?? user?.firstName,
      lastName: lastName ?? user?.lastName,
      gender,
      bvn,
      idNumber,
      phoneNumber: formatPhoneNumber(phone ?? user?.phone),
      idType: formOfId,
    });
  }, [data, user]);

  if (isLoading) return <IsLoading />;

  return (
    <FormikForm
      onChange={() => {
        setHasUnsavedChanges(true);
      }}
      onSubmit={handleSubmit}
    >
      <ImageViewer
        show={!!previewImageUrl}
        closeModal={() => setPreviewImageUrl('')}
        image={previewImageUrl}
      />

      <div className='gap-4 880:flex'>
        <Input label='First Name' name='firstName' />
        <Input label='Last Name' name='lastName' />
      </div>

      <PhoneNumberInput
        label='Phone Number'
        name='phoneNumber'
        setFieldValue={setFieldValue}
        inputMode='tel'
        shouldValidate
      />

      <div className='gap-4 880:flex'>
        <Select
          label='Gender'
          name='gender'
          options={['Male', 'Female', 'Prefer not to say']}
        />

        <DatePicker
          label='Date of Birth'
          name='dateOfBirth'
          {...{
            setFieldValue,
          }}
          limit={8}
          shouldValidate
          fieldType='dateOfBirth'
          maxDate={dayjs()
            .year(dayjs().year() - 18)
            .toDate()}
        />
      </div>

      <h5 className='mt-10'>Identification</h5>
      <p className='mt-1 font-normal text-neutral-400'>
        Verify business owner identity
      </p>

      <Input
        label='BVN'
        name='bvn'
        setFieldValue={setFieldValue}
        type='text'
        inputMode='tel'
        autoComplete='off'
        next={'idType'}
        fieldType='idNumber'
        limit={11}
        shouldValidate
      />

      <div className='gap-4 880:flex'>
        <Select
          label='Form of ID'
          name='idType'
          next={'idNumber'}
          displayValueKey={'name'}
          trueValueKey={'id'}
          options={constructIdTypes()}
        />

        <Input label='ID Number' name='idNumber' />
      </div>

      <FileInput
        label='Copy of ID'
        name='idFile'
        fileType='all'
        maximumFileSizeInMB={2}
        {...{
          setFieldValue,
        }}
        onClickViewExistingFile={(src) => setPreviewImageUrl(src)}
        getFile={(id) => v[id]}
      />

      <p className='mt-8 font-normal text-neutral-400'>
        Have you or anyone associated with you ever held a political office in
        any country?
      </p>

      <RadioInput
        options={['Yes', 'No']}
        className='mt-5'
        setValue={(val) => setFieldValue('politicalAffiliation', val)}
        name='politicalAffiliation'
      />

      <div className='relative mt-10 flex pb-8'>
        <SubmitButton
          submitting={processing}
          className='outline-button min-w-[200px]'
        >
          Save and Continue
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
