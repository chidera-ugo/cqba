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
}

export const AddBudgetBeneficiariesForm = ({
  onSubmit,
  formRecoveryValues,
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
            inviteEmployee={() => null}
            {...{
              formikProps,
            }}
          />
        );
      }}
    </Formik>
  );
};
