import { IsLoading } from 'components/data-states/IsLoading';
import { DatePicker } from 'components/form-elements/DatePicker';
import { Input } from 'components/form-elements/Input';
import { ImageViewer } from 'components/modals/ImageViewer';
import { Form as FormikForm, FormikProps } from 'formik';
import { useGetOrganizationInformation } from 'hooks/api/kyc/useGetOrganizationInformation';
import { useScrollToFormError } from 'hooks/forms/useScrollToFormError';
import Link from 'next/link';
import { DatePickerValue, IFile } from 'types/commons';
import { sanitizeRecordToRemoveUndefinedAndNulls } from 'utils/sanitizers/sanitizeRecordToRemoveUndefinedAndNulls';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { useEffect, useState } from 'react';
import { FileInput } from 'components/form-elements/FileInput';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
  redirectUrl?: string;
}

export const Form = ({ processing, formikProps, redirectUrl }: Props) => {
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

  function prefillDocuments(documents: Record<string, string>): any {
    const res: Record<string, IFile> = {};

    for (const i in documents) {
      res[i] = {
        id: i,
        webUrl: documents[i] ?? '',
      } as IFile;
    }

    return res;
  }

  useEffect(() => {
    if (!data) return;

    const { bnNumber, regDate, documents } =
      sanitizeRecordToRemoveUndefinedAndNulls(data);

    const date = new Date(regDate);

    const creationDate = regDate
      ? {
          value: date?.toISOString(),
          calendarValue: date,
        }
      : {};

    setValues(
      {
        ...values,
        bnNumber,
        creationDate: creationDate as DatePickerValue,
        ...prefillDocuments(documents),
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

      <div className='gap-5 480:flex'>
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
        openImagePreviewModal={(src) => setPreviewImageUrl(src)}
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
        openImagePreviewModal={(src) => setPreviewImageUrl(src)}
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
        openImagePreviewModal={(src) => setPreviewImageUrl(src)}
        getFile={(id) => v[id]}
      />

      <div className={'mt-10 pb-8'}>
        <div className='relative flex'>
          <SubmitButton
            submitting={processing}
            className='primary-button w-full min-w-[170px] 640:w-min'
          >
            Save and Continue
          </SubmitButton>
        </div>

        <Link
          href={`/kyc?tab=${redirectUrl}`}
          className='x-center mx-auto mt-4 flex w-full py-2 text-center text-sm font-medium 640:hidden'
        >
          Skip for later
        </Link>
      </div>
    </FormikForm>
  );
};
