import { Formik } from 'formik';
import {
  IOwner,
  useUpdateOwnerInformation,
} from 'hooks/api/kyc/useUpdateOwnerInformation';
import { useQueryClientInvalidator } from 'hooks/app/useQueryClientInvalidator';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';

export const UpdateOwnerInformationForm = ({
  currentOwner,
  closeModal,
}: {
  currentOwner: IOwner | null;
  closeModal: () => void;
}) => {
  const { invalidate } = useQueryClientInvalidator();

  const { isLoading, mutate } = useUpdateOwnerInformation({
    onSuccess() {
      closeModal();
      invalidate('organization');
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({
        phoneNumber,
        dateOfBirth,
        title,
        percentOwned,
        stateCode: _s,
        ...values
      }) => {
        mutate({
          ...values,
          title: Object.keys(title),
          percentOwned: !percentOwned ? 0 : parseInt(percentOwned),
          phone: phoneNumber,
          dob: String(dateOfBirth.calendarValue?.toISOString()),
          id: currentOwner?._id,
        });
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <Form
            {...{
              currentOwner,
              formikProps,
              processing: isLoading,
            }}
          />
        );
      }}
    </Formik>
  );
};
