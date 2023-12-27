import { FullScreenLoader } from 'components/commons/FullScreenLoader';
import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { AppToast } from 'components/primary/AppToast';
import { Formik } from 'formik';
import { useGetOrganizationInformation } from 'hooks/api/kyc/useGetOrganizationInformation';
import { useUpdateOrganizationDocuments } from 'hooks/api/kyc/useUpdateOrganizationDocuments';
import { useQueryClientInvalidator } from 'hooks/app/useQueryClientInvalidator';
import { useAccountVerificationStatus } from 'hooks/dashboard/kyc/useAccountVerificationStatus';
import { toast } from 'react-toastify';
import { DatePickerValue } from 'types/commons';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';
import { useRouter } from 'next/router';

export const UpdateBusinessDocumentionForm = () => {
  const { replace } = useRouter();

  const { invalidate } = useQueryClientInvalidator();

  const {
    hasProvidedOwnerInformationRequirements,
    hasProvidedCompanyInformation,
  } = useAccountVerificationStatus();

  const redirectUrl = !hasProvidedCompanyInformation
    ? '/company-information'
    : !hasProvidedOwnerInformationRequirements
    ? '/owners-information'
    : 'review-and-submit';

  const { isLoading, mutate } = useUpdateOrganizationDocuments({
    onSuccess() {
      invalidate('organization');

      replace(`/kyc?tab=${redirectUrl}`).then(() => {
        toast(<AppToast>Update successful</AppToast>, { type: 'success' });
      });
    },
  });

  const {
    data: organization,
    isLoading: gettingOrganization,
    isError: failedToGetOrganization,
  } = useGetOrganizationInformation();

  if (gettingOrganization) return <IsLoading />;
  if (failedToGetOrganization) return <IsError />;
  const businessType = organization?.businessType;

  return (
    <Formik
      initialValues={initialValues(businessType)}
      validationSchema={validationSchema(businessType)}
      onSubmit={(values) => {
        mutate({
          regDate: (values?.creationDate as DatePickerValue)?.value,
        });
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <>
            <FullScreenLoader
              id={'update_business_document'}
              portalClassname={'z-[3200]'}
              show={isLoading}
            />

            <h5>Provide your business documents</h5>
            <p className='mt-1 mb-3 max-w-[360px] text-neutral-500'>
              Please provide additional business information and upload business
              documents
            </p>

            <AppErrorBoundary>
              <Form
                {...{
                  formikProps,
                  processing: isLoading,
                  organization,
                }}
                redirectUrl={redirectUrl}
              />
            </AppErrorBoundary>
          </>
        );
      }}
    </Formik>
  );
};
