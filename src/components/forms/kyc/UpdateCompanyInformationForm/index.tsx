import { useQueryClient } from '@tanstack/react-query';
import { FullScreenLoader } from 'components/commons/FullScreenLoader';
import { AppToast } from 'components/primary/AppToast';
import { Formik } from 'formik';
import { useGetOrganizationInformation } from 'hooks/api/kyc/useGetOrganizationInformation';
import { useUpdateCompanyInformation } from 'hooks/api/kyc/useUpdateCompanyInformation';
import { useAccountVerificationStatus } from 'hooks/dashboard/kyc/useAccountVerificationStatus';
import { toast } from 'react-toastify';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';
import { useRouter } from 'next/router';

export const UpdateCompanyInformationForm = () => {
  const { replace } = useRouter();
  const queryClient = useQueryClient();

  const { hasProvidedAllRequirements } = useAccountVerificationStatus();

  const { isLoading, mutate } = useUpdateCompanyInformation({
    onSuccess() {
      queryClient.invalidateQueries(['organization-information']);

      replace(
        `/kyc?tab=${
          hasProvidedAllRequirements
            ? 'review-and-submit'
            : 'owners-information&showSteps=true'
        }`
      ).then(() => {
        toast(<AppToast>Update successful</AppToast>, { type: 'success' });
      });
    },
  });

  const {
    isLoading: gettingOrganizationInformation,
    data: organizationInformation,
  } = useGetOrganizationInformation();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({
        companyType,
        employees,
        expenses,
        businessName,
        businessIndustry,
        phoneNumber,
        ...values
      }) => {
        mutate({
          companyName: businessName,
          businessIndustry,
          phone: phoneNumber,
          averageMonthlyExpenses: expenses,
          businessType: companyType,
          numberOfEmployees: employees,
          ...values,
        });
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <>
            <FullScreenLoader show={isLoading} />

            <h5>Company Information</h5>
            <p className='mt-1 font-normal text-neutral-400'>
              Provide your company information
            </p>

            <Form
              {...{
                formikProps,
                processing: isLoading,
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
