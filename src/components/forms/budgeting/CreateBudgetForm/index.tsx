import { Formik } from 'formik';
import { useCreatePersonalBudget } from 'hooks/api/budgeting/useCreatePersonalBudget';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { useQueryClientInvalidator } from 'hooks/app/useQueryClientInvalidator';
import { FormRecoveryProps } from 'types/forms/form_recovery';
import { formatAmount, sanitizeAmount } from 'utils/formatters/formatAmount';
import { Form } from './Form';
import { validationSchema } from './validationSchema';
import { initialValues } from './initialValues';

export type CreateBudgetFormRecoveryValues = FormRecoveryProps<
  typeof initialValues
>['formRecoveryValues'];

interface Props {
  onSuccess?: (budgetId: string) => void;
  onSubmit?: (values: CreateBudgetFormRecoveryValues) => void;
  formRecoveryValues?: CreateBudgetFormRecoveryValues;
  currency: string;
  isOwner?: boolean;
  budget?: IBudget;
  isProjectCreationFlow?: boolean;
  unallocatedFunds?: number;
}

export const CreateBudgetForm = ({
  onSuccess,
  onSubmit,
  isProjectCreationFlow,
  unallocatedFunds,
  formRecoveryValues,
  currency,
  isOwner,
  budget,
}: Props) => {
  const { invalidate } = useQueryClientInvalidator();

  const { mutate: createPersonalBudget, isLoading: creatingPersonalBudget } =
    useCreatePersonalBudget({
      onSuccess(res) {
        invalidate('budgets', 'balances');

        if (!onSuccess) return;

        onSuccess(res._id);
      },
    });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema(isOwner, unallocatedFunds)}
      onSubmit={(values) => {
        if (onSubmit) return onSubmit(values);

        const {
          amount,
          expiryDate,
          title,
          allocation,
          description,
          expires,
          threshold,
        } = values;

        createPersonalBudget({
          name: title,
          description,
          currency,
          amount:
            parseInt(
              sanitizeAmount({ value: amount, returnTrueAmount: true })
            ) * 100,
          threshold:
            parseInt(
              sanitizeAmount({
                value: !threshold ? amount : allocation,
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
          <>
            {unallocatedFunds !== undefined && (
              <div className='card mt-5 rounded-xl p-4'>
                <div className={'text-xs text-neutral-500'}>
                  Unallocated Funds
                </div>
                <div className='mt-2 block text-xl font-semibold'>
                  {`${currency} ${formatAmount({
                    value: unallocatedFunds / 100,
                  })}`}
                </div>
              </div>
            )}

            <Form
              recoveryValues={formRecoveryValues}
              {...{
                isProjectCreationFlow,
                budget,
                isOwner,
                currency,
                formikProps,
                processing: creatingPersonalBudget,
              }}
            />
          </>
        );
      }}
    </Formik>
  );
};
