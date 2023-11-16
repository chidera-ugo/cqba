import { useQueryClient } from '@tanstack/react-query';
import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { AppToast } from 'components/primary/AppToast';
import FormData from 'form-data';
import { Formik } from 'formik';
import { useUpdateOrganizationDocuments } from 'hooks/api/kyc/useUpdateOrganizationDocuments';
import { useAccountVerificationStatus } from 'hooks/dashboard/kyc/useAccountVerificationStatus';
import { toast } from 'react-toastify';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';
import { useRouter } from 'next/router';

export const UpdateBusinessDocumentionForm = () => {
  const { replace } = useRouter();

  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries(['organization-information']);

      replace(`/kyc?tab=${redirectUrl}&showSteps=true`).then(() => {
        toast(<AppToast>Update successful</AppToast>, { type: 'success' });
      });
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({
        bnNumber,
        businessNameCert,
        cacBn1,
        creationDate,
        utilityBill,
      }) => {
        const body = new FormData();

        body.append('bnNumber', bnNumber);

        if (utilityBill.id) body.append('utilityBill', utilityBill.file);
        if (businessNameCert.id)
          body.append('businessNameCert', businessNameCert.file);
        if (cacBn1.id) body.append('cacBn1', cacBn1.file);

        body.append('regDate', creationDate.value);

        mutate(body);
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <>
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
              }}
            />
          </>
        );
      }}
    </Formik>
  );
};
