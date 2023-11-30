import { Formik } from 'formik';
import { FormRecoveryProps } from 'types/forms/form_recovery';
import { Form } from './Form';
import { validationSchema } from './validationSchema';
import { initialValues } from './initialValues';

export type AddBudgetBeneficiariesFormRecoveryValues = FormRecoveryProps<
  typeof initialValues
>['formRecoveryValues'];

interface Props {
  onSubmit: (values?: AddBudgetBeneficiariesFormRecoveryValues) => void;
  formRecoveryValues?: AddBudgetBeneficiariesFormRecoveryValues;
  currency: string;
  inviteEmployee: (values?: AddBudgetBeneficiariesFormRecoveryValues) => void;
}

export const AddBudgetBeneficiariesForm = ({
  onSubmit,
  currency,
  formRecoveryValues,
  inviteEmployee,
}: Props) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <Form
            recoveryValues={formRecoveryValues}
            inviteEmployee={() => inviteEmployee(formikProps.values)}
            {...{
              currency,
              formikProps,
            }}
          />
        );
      }}
    </Formik>
  );
};
