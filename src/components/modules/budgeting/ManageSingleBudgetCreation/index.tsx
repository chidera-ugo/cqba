import { IsError } from 'components/data-states/IsError';
import { IsLoading } from 'components/data-states/IsLoading';
import { AddBudgetBeneficiariesForm } from 'components/forms/budgeting/AddBudgetBeneficiariesForm';
import { CreateBudgetForm } from 'components/forms/budgeting/CreateBudgetForm';
import { initialValues } from 'components/forms/budgeting/AddBudgetBeneficiariesForm/initialValues';
import { UpdateEmployeeForm } from 'components/forms/employees/UpdateEmployeeForm';
import { useAppContext } from 'context/AppContext';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgets';
import { UseManageSingleBudgetCreation } from 'hooks/budgeting/useManageSingleBudgetCreation';
import { Dispatch, SetStateAction } from 'react';

export enum Mode {
  create,
  create_employee,
  add_beneficiaries,
  approve,
  success,
}

type Props = {
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
  budget?: IBudget;
  onAddBudgetBeneficiariesSubmit?: (values: typeof initialValues) => void;
  unallocatedFunds?: number;
} & Omit<
  UseManageSingleBudgetCreation,
  'getBudget' | 'resetFormRecoveryValues'
>;

export const ManageSingleBudgetCreation = ({
  mode,
  setMode,
  budget,
  createBudgetFormRecoveryValues,
  setAddBudgetBeneficiariesRecoveryValues,
  setCreateBudgetFormRecoveryValues,
  addBudgetBeneficiariesFormRecoveryValues,
  isError,
  unallocatedFunds,
  isLoading,
  currency,
  onAddBudgetBeneficiariesSubmit,
}: Props) => {
  const { user } = useAppContext().state;

  const isOwner = user?.role === 'owner';

  if (mode === Mode.create_employee)
    return (
      <UpdateEmployeeForm
        onSuccess={() => {
          setMode(Mode.add_beneficiaries);
        }}
      />
    );

  if (mode === Mode.add_beneficiaries)
    return (
      <AddBudgetBeneficiariesForm
        currency={currency}
        inviteEmployee={(values) => {
          setAddBudgetBeneficiariesRecoveryValues((prev) => ({
            ...prev!,
            ...values,
          }));

          setMode(Mode.create_employee);
        }}
        formRecoveryValues={addBudgetBeneficiariesFormRecoveryValues}
        onSubmit={(values) => {
          if (onAddBudgetBeneficiariesSubmit)
            return onAddBudgetBeneficiariesSubmit(values);

          setAddBudgetBeneficiariesRecoveryValues((prev) => ({
            ...prev!,
            ...values,
          }));

          setMode(Mode.approve);
        }}
      />
    );

  if (isLoading) return <IsLoading />;

  if (isError)
    return <IsError description={'Failed to initiate budget creation'} />;

  return (
    <CreateBudgetForm
      {...{ budget, unallocatedFunds }}
      currency={currency}
      formRecoveryValues={createBudgetFormRecoveryValues}
      onSubmit={(values) => {
        setCreateBudgetFormRecoveryValues((prev) => ({
          ...prev!,
          ...values,
        }));

        const extraValues =
          isOwner || !user
            ? {}
            : {
                // When an employee is creating budget
                beneficiaries: { [user._id]: true },
              };

        setAddBudgetBeneficiariesRecoveryValues((prev) => ({
          ...prev!,
          budgetAmount: values!.amount,
          ...extraValues,
        }));

        if (isOwner) {
          setMode(Mode.add_beneficiaries);
        } else {
          // When employee is creating budget
          setMode(Mode.approve);
        }
      }}
      isOwner={isOwner}
    />
  );
};
