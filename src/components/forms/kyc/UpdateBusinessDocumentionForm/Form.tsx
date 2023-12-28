import { DatePicker } from 'components/form-elements/DatePicker';
import { FileInput } from 'components/form-elements/FileInput';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { ImageViewer } from 'components/modals/ImageViewer';
import { companyInformationDocuments } from 'constants/kyc/company_information_documents';
import { Business_typeEnum } from 'enums/business_type.enum';
import { Form as FormikForm, FormikProps } from 'formik';
import { IOrganization } from 'hooks/api/kyc/useGetOrganizationInformation';
import { useScrollToFormError } from 'hooks/forms/useScrollToFormError';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DatePickerValue, IFile } from 'types/commons';
import { sanitizeRecordToRemoveUndefinedAndNulls } from 'utils/sanitizers/sanitizeRecordToRemoveUndefinedAndNulls';
import { UpdateBusinessDocumentationInitialValues } from './initialValues';

interface Props {
  formikProps: FormikProps<UpdateBusinessDocumentationInitialValues>;
  processing: boolean;
  redirectUrl?: string;
  organization?: IOrganization;
}

export const Form = ({
  processing,
  formikProps,
  redirectUrl,
  organization,
}: Props) => {
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

  useEffect(() => {
    if (!organization) return;

    const { regDate, documents } =
      sanitizeRecordToRemoveUndefinedAndNulls(organization);

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
        creationDate: creationDate as DatePickerValue,
        ...prefillDocuments(documents),
      },
      false
    );
  }, [organization]);

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

  const businessType =
    organization?.businessType ?? Business_typeEnum.individual;

  return (
    <FormikForm onSubmit={handleSubmit}>
      <ImageViewer
        show={!!previewImageUrl}
        closeModal={() => setPreviewImageUrl('')}
        image={previewImageUrl}
      />

      <div className='gap-5 480:flex'>
        <DatePicker
          label='Company Registration Date'
          name='creationDate'
          {...{
            setFieldValue,
          }}
          shouldValidate
          fieldType='dateOfBirth'
          maxDate={new Date()}
        />
      </div>

      {companyInformationDocuments[businessType].map(({ id, name }) => {
        return (
          <FileInput
            key={name}
            label={name}
            name={id}
            fileType='all'
            maximumFileSizeInMB={2}
            {...{
              setFieldValue,
            }}
            openImagePreviewModal={(src) => setPreviewImageUrl(src)}
            getFile={(id) => v[id]}
          />
        );
      })}

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
