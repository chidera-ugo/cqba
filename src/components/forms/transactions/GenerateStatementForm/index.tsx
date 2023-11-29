import { Formik } from 'formik';
import { useGenerateStatement } from 'hooks/api/wallet/useGenerateStatement';
import { Form } from './Form';
import { validationSchema } from './validationSchema';
import { initialValues } from './initialValues';
import { toast } from 'react-toastify';
import { AppToast } from 'components/primary/AppToast';

interface Props {
  close: () => void;
}

export const GenerateStatementForm = ({ close }: Props) => {
  const { mutate, isLoading } = useGenerateStatement();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const { startDate, endDate } = values;

        mutate(
          {
            from: startDate.value,
            to: endDate.value,
          },
          {
            onSuccess() {
              toast(
                <AppToast>Statement has been sent to your email</AppToast>,
                { type: 'success' }
              );

              close();
            },
          }
        );
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
