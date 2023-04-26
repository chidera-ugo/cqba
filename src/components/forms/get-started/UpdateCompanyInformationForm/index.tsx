import { Formik } from 'formik';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { useState } from 'react';

export const UpdateCompanyInformationForm = () => {
  const { isLoading, mutate } = useMakeDummyHttpRequest({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ ...values }) => {
        setHasUnsavedChanges(false);
        mutate(
          {
            ...values,
          },
          {
            onSuccess() {
              setHasUnsavedChanges(false);
            },
          }
        );
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <Form
            {...{
              formikProps,
              processing: isLoading,
              hasUnsavedChanges,
              setHasUnsavedChanges,
            }}
          />
        );
      }}
    </Formik>
  );
};
