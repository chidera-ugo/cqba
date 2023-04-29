import { Formik } from 'formik';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { useState } from 'react';
import { IFile } from 'types/Common';
import { useRouter } from 'next/router';

export const UpdateBusinessDocumentionForm = () => {
  const { replace } = useRouter();
  const { isLoading, mutate } = useMakeDummyHttpRequest({});
  const [files, setFiles] = useState<Record<string, IFile> | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ ...values }) => {
        setHasUnsavedChanges(false);
        mutate(
          {
            ...values,
          },
          {
            onSuccess() {
              setHasUnsavedChanges(false);
              replace('/get-started?tab=owner-information');
            },
          }
        );
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <Form
            {...{
              formikProps,
              processing: isLoading,
              hasUnsavedChanges,
              setHasUnsavedChanges,
              setFiles,
              files,
            }}
          />
        );
      }}
    </Formik>
  );
};
