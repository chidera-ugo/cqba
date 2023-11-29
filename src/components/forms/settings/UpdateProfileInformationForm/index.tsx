import { useQueryClient } from '@tanstack/react-query';
import { FullScreenLoader } from 'components/commons/FullScreenLoader';
import { SubmitButton } from 'components/form-elements/SubmitButton';
import { AppToast } from 'components/primary/AppToast';
import { Formik } from 'formik';
import { useMakeDummyHttpRequest } from 'hooks/commons/useMakeDummyHttpRequest';
import { toast } from 'react-toastify';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';

export const UpdateProfileInformationForm = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMakeDummyHttpRequest({
    onSuccess() {
      queryClient.invalidateQueries(['organization-information']);
      toast(<AppToast>Update successful</AppToast>, { type: 'success' });
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        mutate(values);
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <>
            <FullScreenLoader show={isLoading} />

            <div className='x-between mb-3'>
              <h6 className={'my-auto'}>Profile</h6>
              <SubmitButton
                submitting={isLoading}
                className={'dark-button h-10 text-sm'}
              >
                Submit
              </SubmitButton>
            </div>

            <Form
              {...{
                formikProps,
              }}
            />
          </>
        );
      }}
    </Formik>
  );
};
