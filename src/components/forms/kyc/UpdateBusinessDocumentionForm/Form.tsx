import { IsLoading } from 'components/data-states/IsLoading';
import { DatePicker } from 'components/form-elements/DatePicker';
import { Input } from 'components/form-elements/Input';
import { ImageViewer } from 'components/modals/ImageViewer';
import { Form as FormikForm, FormikProps } from 'formik';
import { useGetOrganizationInformation } from 'hooks/api/kyc/useGetOrganizationInformation';
import { useScrollToFormError } from 'hooks/forms/useScrollToFormError';
import { sanitizeRecordToRemoveUndefinedAndNulls } from 'utils/sanitizers/sanitizeRecordToRemoveUndefinedAndNulls';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { useEffect, useState } from 'react';
import { FileInput } from 'components/form-elements/FileInput';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
}

export const Form = ({ processing, formikProps }: Props) => {
  const {
    handleSubmit,
    setValues,
    setFieldValue,
    values,
    errors,
    submitCount,
  } = formikProps;

  const v = values as any;

  useScrollToFormError(errors, submitCount);

  const [previewImageUrl, setPreviewImageUrl] = useState('');

  const { data, isLoading } = useGetOrganizationInformation();

  useEffect(() => {
    if (!data) return;

    const { bnNumber, regDate } = sanitizeRecordToRemoveUndefinedAndNulls(data);

    const date = new Date(regDate);

    setValues(
      {
        ...values,
        bnNumber,
        creationDate: {
          value: date.toISOString(),
          calendarValue: date,
        },
      },
      false
    );
  }, [data]);

  if (isLoading) return <IsLoading />;

  return (
    <FormikForm onSubmit={handleSubmit}>
      <ImageViewer
        show={!!previewImageUrl}
        closeModal={() => setPreviewImageUrl('')}
        image={previewImageUrl}
      />

      <div className='flex gap-4'>
        <Input label='BN Number' name='bnNumber' />

        <DatePicker
          label='Company Registration Date'
          name='creationDate'
          {...{
            setFieldValue,
          }}
          limit={8}
          shouldValidate
          disableTyping
          fieldType='dateOfBirth'
          maxDate={new Date()}
        />
      </div>

      <FileInput
        label='Proof of Address / Utility Bill'
        name='utilityBill'
        fileType='all'
        maximumFileSizeInMB={2}
        {...{
          setFieldValue,
        }}
        onClickViewExistingFile={(src) => setPreviewImageUrl(src)}
        getFile={(id) => v[id]}
      />

      <div className='mt-4'>
        <p className={'text-xs text-neutral-500'}>
          Upload a copy of your bank statement, utility bill, phone bill, tax
          assessment, or any government-issued document.
        </p>
        <ul className={'mt-2 text-xs text-neutral-500'}>
          <li>All documents must be less than 3 months old</li>
          <li>
            And must include the name of the identified individual or business
          </li>
        </ul>
      </div>

      <FileInput
        label='Certificate of Business Name'
        name='businessNameCert'
        fileType='all'
        maximumFileSizeInMB={2}
        {...{
          setFieldValue,
        }}
        onClickViewExistingFile={(src) => setPreviewImageUrl(src)}
        getFile={(id) => v[id]}
      />

      <FileInput
        label='CAC-BN1'
        name='cacBn1'
        fileType='all'
        maximumFileSizeInMB={2}
        {...{
          setFieldValue,
        }}
        onClickViewExistingFile={(src) => setPreviewImageUrl(src)}
        getFile={(id) => v[id]}
      />

      <div className='relative mt-10 flex pb-8'>
        <SubmitButton
          submitting={processing}
          className='primary-button min-w-[170px]'
        >
          Save and Continue
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
