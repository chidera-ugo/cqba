import { useQueryClient } from '@tanstack/react-query';
import { FullScreenLoader } from 'components/common/FullScreenLoader';
import { AppToast } from 'components/primary/AppToast';
import { Formik } from 'formik';
import {
  IOwner,
  useUpdateOwnerInformation,
} from 'hooks/api/kyc/useUpdateOwnerInformation';
import { toast } from 'react-toastify';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';

export const UpdateOwnerInformationForm = ({
  type,
  currentOwner,
  closeModal,
}: {
  type: 'owner' | 'director';
  currentOwner: IOwner | null;
  closeModal: () => void;
}) => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useUpdateOwnerInformation({
    onSuccess() {
      queryClient.invalidateQueries(['organization-information']);
      closeModal();
      toast(<AppToast>Update successful</AppToast>, { type: 'success' });
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema(type)}
      onSubmit={({ phoneNumber, dateOfBirth, percentOwned, ...values }) => {
        mutate({
          ...values,
          percentOwned: !percentOwned ? 0 : parseInt(percentOwned),
          phone: phoneNumber,
          dob: String(dateOfBirth.calendarValue?.toISOString()),
          id: currentOwner?.id,
        });
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <>
            <FullScreenLoader show={isLoading} />

            <Form
              {...{
                currentOwner,
                type,
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
