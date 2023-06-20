import { useQueryClient } from '@tanstack/react-query';
import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { IdNavigator } from 'components/common/IdNavigator';
import UnsavedChangesPrompt from 'components/common/UnsavedChangesPrompt';
import { Formik } from 'formik';
import { useUpdateOwnerInformation } from 'hooks/api/kyc/useUpdateOwnerInformation';
import { appendCountryCode } from 'utils/modifiers/appendCountryCode';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const UpdateOwnerInformationForm = () => {
  const { replace } = useRouter();

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useUpdateOwnerInformation({
    onSuccess() {
      queryClient.invalidateQueries(['organization-information']);
      replace('/kyc?tab=business-documentation');
    },
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({
        phoneNumber,
        dateOfBirth,
        politicalAffiliation,
        idFile,
        idType,

        ...values
      }) => {
        setHasUnsavedChanges(false);

        mutate({
          ...values,
          phone: appendCountryCode(phoneNumber),
          dob: dateOfBirth?.calendarValue?.toISOString(),
          politicalAffiliation: politicalAffiliation === 'Yes',
          formOfId: idType,
          idImageUrl: idFile?.file?.name,
        });
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <>
            <IdNavigator id='owner-information' autoFocus />

            <UnsavedChangesPrompt {...{ hasUnsavedChanges }} />

            <FullScreenLoader show={isLoading} />

            <h5>Owner Information</h5>
            <p className='mt-1 font-normal text-neutral-400'>
              Provide your company information
            </p>

            <Form
              {...{
                formikProps,
                processing: isLoading,
                hasUnsavedChanges,
                setHasUnsavedChanges,
              }}
            />
          </>
        );
      }}
    </Formik>
  );
};
