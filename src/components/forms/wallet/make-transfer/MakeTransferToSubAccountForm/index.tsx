import { Formik } from 'formik';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { SubAccount } from 'types/wallet/FundWallet';

interface Props {
  proceed: (values: any) => void;
  subAccounts: SubAccount[];
}

export const MakeTransferToSubAccountForm = ({
  proceed,
  subAccounts,
}: Props) => {
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
              proceed(values);
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
