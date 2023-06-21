import { useQueryClient } from '@tanstack/react-query';
import { FullScreenLoader } from 'components/common/FullScreenLoader';
import UnsavedChangesPrompt from 'components/common/UnsavedChangesPrompt';
import { AppToast } from 'components/primary/AppToast';
import { Formik } from 'formik';
import { useGetOrganizationInformation } from 'hooks/api/kyc/useGetOrganizationInformation';
import { useUpdateCompanyInformation } from 'hooks/api/kyc/useUpdateCompanyInformation';
import { toast } from 'react-toastify';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const UpdateCompanyInformationForm = () => {
  const { replace } = useRouter();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useUpdateCompanyInformation({
    onSuccess() {
      queryClient.invalidateQueries(['organization-information']);
      replace('/kyc?tab=owner-information').then(() => {
        toast(<AppToast>Update successful</AppToast>, { type: 'success' });
      });
    },
  });

  const {
    isLoading: gettingOrganizationInformation,
    data: organizationInformation,
  } = useGetOrganizationInformation();

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({
        companyType,
        city,
        state,
        address,
        employees,
        expenses,
      }) => {
        setHasUnsavedChanges(false);

        mutate({
          businessAddress: address,
          averageMonthlyExpenses: expenses,
          businessType: companyType,
          numberOfEmployees: employees,
          city,
          state,
        });
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <>
            <UnsavedChangesPrompt {...{ hasUnsavedChanges }} />

            <FullScreenLoader show={isLoading} />

            <h5>Company Information</h5>
            <p className='mt-1 font-normal text-neutral-400'>
              Provide your company information
            </p>

            <Form
              {...{
                formikProps,
                processing: isLoading,
                setHasUnsavedChanges,
                organizationInformation,
                gettingOrganizationInformation,
              }}
            />
          </>
        );
      }}
    </Formik>
  );
};
