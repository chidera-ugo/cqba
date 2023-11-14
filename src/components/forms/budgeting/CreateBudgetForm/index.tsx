import { useQueryClient } from '@tanstack/react-query';
import { GreenCheck } from 'components/illustrations/Success';
import { SimpleInformation } from 'components/modules/common/SimpleInformation';
import { Formik } from 'formik';
import { useCreateBudget } from 'hooks/api/budgeting/useCreateBudget';
import { Dispatch, SetStateAction, useState } from 'react';
import { sanitizeAmount } from 'utils/formatters/formatAmount';
import { Form } from './Form';
import { validationSchema } from './validationSchema';
import { initialValues } from './initialValues';

interface Props {
  close: () => void;
  createCategory: () => void;
  formRecoveryValues: Record<string, any> | null;
  setFormRecoveryValues: Dispatch<SetStateAction<Record<string, any> | null>>;
  addDepartment?: (values: Record<string, any>) => void;
}

export const CreateBudgetForm = ({
  close,
  createCategory,
  setFormRecoveryValues,
  formRecoveryValues,
  addDepartment,
}: Props) => {
  const queryClient = useQueryClient();

  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate, isLoading } = useCreateBudget({
    onSuccess() {
      queryClient.invalidateQueries(['budgets']);
      setIsSuccess(true);
    },
  });

  if (isSuccess)
    return (
      <SimpleInformation
        className={'mt-20'}
        icon={<GreenCheck />}
        title={<span className='text-xl'>Budget Created</span>}
        description={
          <span
            className={'mt-1 block max-w-[280px] text-base text-neutral-500'}
          >
            Congratulations! Your budget has been created successfully
          </span>
        }
        actionButton={{
          text: 'Thanks chief',
          action: () => {
            close();
            setIsSuccess(false);
          },
        }}
      />
    );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={({ amount, dueDate, ...values }) => {
        mutate({
          ...values,
          amount: sanitizeAmount({ value: amount, returnTrueAmount: true }),
          deadline: dueDate.value,
        });
      }}
      validateOnBlur={false}
    >
      {(formikProps) => {
        return (
          <Form
            createCategory={(values) => {
              setFormRecoveryValues(values);
              createCategory();
            }}
            {...{
              addDepartment,
              formRecoveryValues,
              formikProps,
              processing: isLoading,
            }}
          />
        );
      }}
    </Formik>
  );
};
