import { Formik } from 'formik';
import { Form } from './Form';
import { validationSchema } from './validationSchema';
import { initialValues } from './initialValues';
import { toast } from 'react-toastify';
import { encode } from 'base64-arraybuffer';
import { AppToast } from 'components/primary/AppToast';
import { useMakeDummyHttpRequest } from 'hooks/commons/useMakeDummyHttpRequest';

interface Props {
  accountNumber: string;
  close: () => void;
}

export const GenerateStatementForm = ({ accountNumber, close }: Props) => {
  const { mutate, isLoading } = useMakeDummyHttpRequest({});

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const { startDate, endDate } = values;

        mutate(
          {
            startDate,
            endDate,
          },
          {
            onSuccess(res) {
              const linkSource = `data:application/pdf;base64,${encode(res)}`;
              const downloadLink = document.createElement('a');
              downloadLink.href = linkSource;
              downloadLink.download = `acccount-statement-for-${accountNumber}-aku`;
              downloadLink.click();

              toast(
                <AppToast>
                  Downloading statement. It has also been sent to your email
                </AppToast>,
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
