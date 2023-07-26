import { IsLoading } from 'components/data-states/IsLoading';
import { Input } from 'components/form-elements/Input';
import { ImageViewer } from 'components/modals/ImageViewer';
import { Form as FormikForm, FormikProps } from 'formik';
import { useGetOrganizationInformation } from 'hooks/api/kyc/useGetOrganizationInformation';
import { useScrollToFormError } from 'hooks/forms/useScrollToFormError';
import { sanitizeRecordToRemoveUndefinedAndNulls } from 'utils/sanitizers/sanitizeRecordToRemoveUndefinedAndNulls';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { Select } from 'components/form-elements/Select';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FileInput } from 'components/form-elements/FileInput';

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

    const {
      utilityBillType,
      utilityBillImageUrl,
      bnNumberImageUrl,
      bnNumber,
      taxIdNumber,
    } = sanitizeRecordToRemoveUndefinedAndNulls(data);

    setValues(
      {
        ...values,
        tin: taxIdNumber,
        bnNumber,
        bnDocumentFile: {
          ...values.bnDocumentFile,
          webUrl: bnNumberImageUrl,
        },
        utilityBillFile: {
          ...values.utilityBillFile,
          webUrl: utilityBillImageUrl,
        },
        utilityBillType,
      },
      false
    );
  }, [data]);

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

      <Input label='BN Number' name='bnNumber' />
      <Input label='Tax Identification Number' name='tin' />

      <Select
        label='Utility Bill'
        name='utilityBillType'
        options={['Electricity', 'Water Bill', 'Tenancy agreement']}
      />

      <FileInput
        label='Copy of utility bill (Valid within 3 months)'
        name='utilityBillFile'
        fileType='all'
        maximumFileSizeInMB={2}
        {...{
          setFieldValue,
        }}
        onClickViewExistingFile={(src) => setPreviewImageUrl(src)}
        getFile={(id) => v[id]}
      />

      <FileInput
        label='BN Document'
        name='bnDocumentFile'
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
          className='outline-button min-w-[200px]'
        >
          Save and Continue
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
