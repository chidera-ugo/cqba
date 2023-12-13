import { AppToast } from 'components/primary/AppToast';
import { Formik } from 'formik';
import {
  IOwner,
  useUpdateOwnerInformation,
} from 'hooks/api/kyc/useUpdateOwnerInformation';
import { useQueryInvalidator } from 'hooks/app/useQueryInvalidator';
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
  const { invalidate } = useQueryInvalidator();

  const { isLoading, mutate } = useUpdateOwnerInformation({
    onSuccess() {
      closeModal();
      invalidate('organization');
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
          <Form
            {...{
              currentOwner,
              type,
              formikProps,
              processing: isLoading,
            }}
          />
        );
      }}
    </Formik>
  );
};
