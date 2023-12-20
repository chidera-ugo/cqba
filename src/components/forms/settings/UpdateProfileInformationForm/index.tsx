import { AppErrorBoundary } from 'components/core/ErrorBoundary';
import { UpdateAvatar } from 'components/forms/settings/UpdateProfileInformationForm/UpdateAvatar';
import { AppToast } from 'components/primary/AppToast';
import { useAppContext } from 'context/AppContext';
import FormData from 'form-data';
import { Formik } from 'formik';
import { useUpdateAvatar } from 'hooks/api/settings/useUpdateAvatar';
import { useUpdateProfile } from 'hooks/api/settings/useUpdateProfile';
import { toast } from 'react-toastify';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';

export const UpdateProfileInformationForm = () => {
  const { getCurrentUser } = useAppContext();

  const { isLoading: uploadingAvatar, mutate: uploadAvatar } =
    useUpdateAvatar();

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
      onSubmit={({ role: _, avatar, phoneNumber }) => {
        if (avatar.file) {
          const body = new FormData();

          body.append('avatar', avatar?.file);

          uploadAvatar(body, {
            onSuccess() {
              mutate({
                phone: phoneNumber,
              });
            },
          });
        } else {
          mutate({
            phone: phoneNumber,
          });
        }
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        const _avatar = formikProps.values.avatar;

        const avatar = _avatar?.url ?? _avatar.webUrl;

        return (
          <>
            <AppErrorBoundary>
              <UpdateAvatar
                avatar={avatar}
                setFieldValue={formikProps?.setFieldValue}
              />
            </AppErrorBoundary>

            <div className={'mt-8 border-t border-neutral-200 pt-5'}>
              <Form
                submitting={isLoading || uploadingAvatar}
                formikProps={formikProps}
              />
            </div>
          </>
        );
      }}
    </Formik>
  );
};
