import { Formik } from 'formik';
import { ApproveBudgetDto } from 'hooks/api/budgeting/useApproveBudget';
import { sanitizeAmount } from 'utils/formatters/formatAmount';
import { Form } from './Form';
import { validationSchema } from './validationSchema';
import { initialValues } from './initialValues';

interface Props {
  onSubmit: (values: Omit<ApproveBudgetDto, 'pin'>) => void;
  decline: () => void;
  currency: string;
  amount: number;
}

export const ApproveBudgetForm = ({
  onSubmit,
  decline,
  amount,
  currency,
}: Props) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ expiryDate, allocation, expires, threshold }) => {
        onSubmit({
          threshold: !threshold
            ? amount
            : parseInt(
                sanitizeAmount({
                  value: allocation,
                  returnTrueAmount: true,
                })
              ) * 100,
          expiry: expires ? expiryDate.calendarValue : null,
        });
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <Form
            {...{
              amount,
              decline,
              currency,
              formikProps,
            }}
          />
        );
      }}
    </Formik>
  );
};
