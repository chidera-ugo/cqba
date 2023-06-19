import { useQueryClient } from '@tanstack/react-query';
import { FullScreenLoader } from 'components/common/FullScreenLoader';
import UnsavedChangesPrompt from 'components/common/UnsavedChangesPrompt';
import { Formik } from 'formik';
import { useAddEmployee } from 'hooks/api/employees/useAddEmployee';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';
import { useState } from 'react';

interface Props {
  onSuccess: () => void;
}

export const AddEmployeeForm = ({ onSuccess }: Props) => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useAddEmployee({
    onSuccess() {
      queryClient.invalidateQueries(['employees']);
      onSuccess();
    },
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ phoneNumber: _, ...values }) => {
        setHasUnsavedChanges(false);

        mutate({
          ...values,
          department: 'sales',
        });
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <>
            <UnsavedChangesPrompt {...{ hasUnsavedChanges }} />

            <FullScreenLoader show={isLoading} />

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
