import { Formik } from 'formik';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { SubAccount } from 'types/wallet/FundWallet';
import { toast } from 'react-toastify';
import { AppToast } from 'components/primary/AppToast';

interface Props {
  close: (values: any) => void;
  subAccounts: SubAccount[];
}

export const CreateCardForm = ({ close, subAccounts }: Props) => {
  const { isLoading, mutate } = useMakeDummyHttpRequest({});

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ ...values }) => {
        mutate(
          {
            ...values,
          },
          {
            onSuccess() {
              close(values);
              toast(<AppToast>Created card successfully</AppToast>, {
                type: 'success',
              });
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
              subAccounts,
            }}
          />
        );
      }}
    </Formik>
  );
};
