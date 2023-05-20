import { Formik } from 'formik';
import { Form } from './Form';
import { validationSchema } from './validationSchema';
import { initialValues } from './initialValues';
import { toast } from 'react-toastify';
import { AppToast } from 'components/primary/AppToast';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';

interface Props {
  close: () => void;
}

export const CreateBudgetForm = ({ close }: Props) => {
  const { mutate, isLoading } = useMakeDummyHttpRequest({
    onSuccess() {
      toast(<AppToast>Created budget successfully</AppToast>, {
        type: 'success',
      });
      close();
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        mutate(values);
      }}
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
