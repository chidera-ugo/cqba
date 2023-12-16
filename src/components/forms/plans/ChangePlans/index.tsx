import { Formik } from 'formik';
import { Form } from './Form';
import { validationSchema } from './validationSchema';
import { initialValues } from './initialValues';
import { toast } from 'react-toastify';
import { AppToast } from 'components/primary/AppToast';
import { useMakeDummyHttpRequest } from 'hooks/commons/useMakeDummyHttpRequest';

interface Props {
  onSuccess: () => void;
}

export const ChangePlanForm = ({ onSuccess }: Props) => {
  const { isLoading, mutate } = useMakeDummyHttpRequest({
    onSuccess() {
      toast(<AppToast>Successfully changed plans</AppToast>, {
        type: 'success',
      });
      onSuccess();
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ plan, paymentMethod }) => {
        mutate({
          plan,
          paymentMethod,
        });
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <Form
            {...{
              formikProps,
              processing: isLoading,
            }}
          />
        );
      }}
    </Formik>
  );
};
