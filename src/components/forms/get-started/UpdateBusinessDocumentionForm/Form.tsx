import { Input } from 'components/form-elements/Input';
import { Form as FormikForm, FormikProps } from 'formik';
import { initialValues } from './initialValues';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { Select } from 'components/form-elements/Select';
import { Dispatch, SetStateAction } from 'react';
import UnsavedChangesPrompt from 'components/common/UnsavedChangesPrompt';
import { IdNavigator } from 'components/common/IdNavigator';
import { FileInput } from 'components/form-elements/FileInput';
import { IFile } from 'types/Common';

interface Props {
  formikProps: FormikProps<typeof initialValues>;
  processing: boolean;
  hasUnsavedChanges: boolean;
  setHasUnsavedChanges: Dispatch<SetStateAction<boolean>>;
  setFiles: Dispatch<SetStateAction<Record<string, IFile> | null>>;
  files: Record<string, IFile> | null;
}

export const Form = ({
  processing,
  formikProps,
  hasUnsavedChanges,
  setHasUnsavedChanges,
  setFiles,
  files,
}: Props) => {
  const { handleSubmit, setFieldValue } = formikProps;

  return (
    <FormikForm
      onChange={() => {
        setHasUnsavedChanges(true);
      }}
      onSubmit={handleSubmit}
    >
      <IdNavigator id='business-documentation' autoFocus />
      <UnsavedChangesPrompt {...{ hasUnsavedChanges }} />

      <h5>Provide your business documents</h5>
      <p className='mt-1 font-normal text-neutral-400'>
        Please provide additional business information and upload business
        documents
      </p>

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
        setFile={(file) => {
          setFieldValue('utilityBillFile', true);
          setFiles((prev) => {
            return {
              ...prev,
              [file.id]: file,
            };
          });
        }}
        file={files?.utilityBillFile ?? null}
      />

      <FileInput
        label='BN Document'
        name='bnDocumentFile'
        fileType='all'
        maximumFileSizeInMB={2}
        setFile={(file) => {
          setFieldValue('bnDocumentFile', true);
          setFiles((prev) => {
            return {
              ...prev,
              [file.id]: file,
            };
          });
        }}
        file={files?.bnDocumentFile ?? null}
      />

      <div className='relative mt-10 flex pb-8'>
        <SubmitButton
          submitting={processing}
          className='outline-button w-full min-w-[200px] 640:w-auto'
        >
          Save and Continue
        </SubmitButton>
      </div>
    </FormikForm>
  );
};
