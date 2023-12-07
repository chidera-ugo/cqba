import { UpdateAvatar } from 'components/forms/settings/UpdateProfileInformationForm/UpdateAvatar';
import { AppToast } from 'components/primary/AppToast';
import { useAppContext } from 'context/AppContext';
import { Formik } from 'formik';
import { useUpdateProfile } from 'hooks/api/settings/useUpdateProfile';
import { toast } from 'react-toastify';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';

export const UpdateProfileInformationForm = () => {
  const { getCurrentUser } = useAppContext();

  const { isLoading, mutate } = useUpdateProfile({
    onSuccess() {
      getCurrentUser!(null);
      toast(<AppToast>Update successful</AppToast>, { type: 'success' });
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ role: _, phoneNumber, ...values }) => {
        mutate({
          ...values,
          phone: phoneNumber,
          avatar: values.avatar.base64Url,
        });
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        const _avatar = formikProps.values.avatar;

        const avatar = _avatar?.url ?? _avatar?.webUrl;

        return (
          <>
            <UpdateAvatar
              avatar={avatar}
              setFieldValue={formikProps?.setFieldValue}
            />

            <div className={'mt-8 border-t border-neutral-200 pt-5'}>
              <Form submitting={isLoading} formikProps={formikProps} />
            </div>
          </>
        );
      }}
    </Formik>
  );
};
