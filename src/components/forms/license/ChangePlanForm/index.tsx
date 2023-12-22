import { Formik } from 'formik';
import { UseManageSubscription } from 'hooks/license/useManageSubscription';
import { Form } from './Form';
import { validationSchema } from './validationSchema';
import { initialValues } from './initialValues';

export const ChangePlanForm = ({
  proceed,
}: {
  proceed: UseManageSubscription['proceed'];
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ plan, paymentMethod, monthlyPlan }) => {
        proceed(paymentMethod, plan, monthlyPlan ? 1 : 12);
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <Form
            {...{
              formikProps,
            }}
          />
        );
      }}
    </Formik>
  );
};
