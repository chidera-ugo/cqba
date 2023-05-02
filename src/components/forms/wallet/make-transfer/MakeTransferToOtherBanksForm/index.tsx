import { Formik } from 'formik';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { Form } from './Form';
import { useMakeDummyHttpRequest } from 'hooks/common/useMakeDummyHttpRequest';
import { Institution } from 'types/wallet/FundWallet';

interface Props {
  proceed: (values: any) => void;
  institutions: Institution[];
}

export const MakeTransferToOtherBanksForm = ({
  proceed,
  institutions,
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
              institutions,
            }}
          />
        );
      }}
    </Formik>
  );
};
