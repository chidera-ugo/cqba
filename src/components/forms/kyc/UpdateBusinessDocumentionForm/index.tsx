import { useQueryClient } from '@tanstack/react-query';
import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { IdNavigator } from 'components/common/IdNavigator';
import UnsavedChangesPrompt from 'components/common/UnsavedChangesPrompt';
import { AppToast } from 'components/primary/AppToast';
import { Formik } from 'formik';
import { useUpdateOrganizationDocuments } from 'hooks/api/kyc/useUpdateOrganizationDocuments';
import { toast } from 'react-toastify';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const UpdateBusinessDocumentionForm = () => {
  const { replace } = useRouter();

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useUpdateOrganizationDocuments({
    onSuccess() {
      queryClient.invalidateQueries(['organization-information']);
      replace('/kyc?tab=review-and-submit').then(() => {
        toast(<AppToast>Update successful</AppToast>, { type: 'success' });
      });
    },
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({
        bnDocumentFile,
        bnNumber,
        utilityBillFile,
        utilityBillType,
        tin,
      }) => {
        setHasUnsavedChanges(false);

        mutate({
          bnNumber,
          bnNumberImageUrl: bnDocumentFile.file.name,
          utilityBillType,
          taxIdNumber: tin,
          utilityBillImageUrl: utilityBillFile.file.name,
        });
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <>
            <IdNavigator id='business-documentation' autoFocus />

            <UnsavedChangesPrompt {...{ hasUnsavedChanges }} />

            <FullScreenLoader show={isLoading} />

            <h5>Provide your business documents</h5>
            <p className='mt-1 font-normal text-neutral-400'>
              Please provide additional business information and upload business
              documents
            </p>

            <Form
              {...{
                formikProps,
                processing: isLoading,
                setHasUnsavedChanges,
              }}
            />
          </>
        );
      }}
    </Formik>
  );
};
