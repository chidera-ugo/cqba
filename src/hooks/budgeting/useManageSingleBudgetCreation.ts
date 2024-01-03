import { AddBudgetBeneficiariesFormRecoveryValues } from 'components/forms/budgeting/AddBudgetBeneficiariesForm';
import { CreateBudgetFormRecoveryValues } from 'components/forms/budgeting/CreateBudgetForm';
import {
  BudgetPriorities,
  BudgetPriority,
  getPriorityAsText,
} from 'enums/budget';
import {
  Beneficiary,
  CreateBudgetDto,
} from 'hooks/api/budgeting/useCreateBudget';
import { IBudget } from 'hooks/api/budgeting/useGetAllBudgetsOrProjects';
import { useGetBudgetBeneficiaries } from 'hooks/api/employees/useGetBudgetBeneficiaries';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { useEffect, useState } from 'react';
import { DatePickerValue } from 'types/commons';
import {
  formatAmount,
  getAmountInLowestUnit,
  sanitizeAmount,
} from 'utils/formatters/formatAmount';
import { MultiCheckValue } from 'utils/validators/validateMultiCheckValues';

export const useManageSingleBudgetCreation = (budget?: IBudget) => {
  const [createBudgetFormRecoveryValues, setCreateBudgetFormRecoveryValues] =
    useState<CreateBudgetFormRecoveryValues>(null);

  const [
    addBudgetBeneficiariesFormRecoveryValues,
    setAddBudgetBeneficiariesRecoveryValues,
  ] = useState<AddBudgetBeneficiariesFormRecoveryValues>(null);

  const { data } = useGetBudgetBeneficiaries();

  useEffect(() => {
    populateRecoveryValuesForBeneficiariesEditingFlow();
  }, [data, budget]);

  const { primaryWallet, isError, isLoading } = useManageWallets();

  const currency = primaryWallet?.currency;

  function populateRecoveryValuesForBeneficiariesEditingFlow() {
    if (!data || !budget) return;

    const beneficiaryEmails: Record<string, boolean> = {};

    for (const i of budget?.beneficiaries) {
      beneficiaryEmails[i.email] = true;
    }

    const beneficiaries: MultiCheckValue = {};

    for (const i of data) {
      if (beneficiaryEmails[i.email]) beneficiaries[i._id] = true;
    }

    setAddBudgetBeneficiariesRecoveryValues((prev) => ({
      ...prev!,
      beneficiaries,
      budgetAmount: formatAmount({
        value: budget?.amount / 100 ?? 0,
        decimalPlaces: 2,
      }),
    }));

    const {
      name,
      amount,
      description,
      allocatedAmount,
      expiry,
      priority,
      threshold,
    } = budget;

    const date = new Date(expiry);

    setCreateBudgetFormRecoveryValues(() => ({
      threshold: !!threshold,
      title: name,
      amount: formatAmount({ value: amount, decimalPlaces: 2 }),
      priority: getPriorityAsText(priority),
      allocation: formatAmount({ value: allocatedAmount, decimalPlaces: 2 }),
      description,
      expires: !!expiry,
      expiryDate: (expiry
        ? {
            value: date.toISOString(),
            calendarValue: date,
          }
        : {}) as DatePickerValue,
    }));
  }

  function getBudget(
    budgetBeneficiaries?: AddBudgetBeneficiariesFormRecoveryValues
  ): Omit<CreateBudgetDto, 'pin'> | null {
    if (!createBudgetFormRecoveryValues || !budgetBeneficiaries) return null;

    const {
      amount,
      expiryDate,
      title,
      allocation,
      description,
      expires,
      threshold,
      priority,
    } = createBudgetFormRecoveryValues;

    const { splittingRules, beneficiaries, allocations, budgetAmount } =
      budgetBeneficiaries;

    function getBeneficiaries() {
      const arr: Beneficiary[] = [];

      const count = Object.values(beneficiaries)?.filter((val) => val)?.length;

      const _budgetAmount = Number(
        sanitizeAmount({ value: budgetAmount, returnTrueAmount: true })
      );

      for (const i in beneficiaries) {
        if (beneficiaries[i]) {
          const allocation = !splittingRules
            ? _budgetAmount / count
            : count === 1
            ? _budgetAmount
            : Number(
                sanitizeAmount({
                  value: allocations[i]!,
                  returnTrueAmount: true,
                })
              );

          arr.push({
            user: i,
            allocation: parseInt((allocation * 100).toString()),
          });
        }
      }

      return arr;
    }

    return {
      name: title,
      description,
      priority: BudgetPriorities[priority as BudgetPriority],
      beneficiaries: getBeneficiaries(),
      currency,
      amount: getAmountInLowestUnit(amount),
      threshold: getAmountInLowestUnit(!threshold ? amount : allocation),
      expiry: expires ? expiryDate.calendarValue : null,
    };
  }

  function resetFormRecoveryValues() {
    setCreateBudgetFormRecoveryValues(null);
    setAddBudgetBeneficiariesRecoveryValues(null);
  }

  return {
    createBudgetFormRecoveryValues,
    setCreateBudgetFormRecoveryValues,
    addBudgetBeneficiariesFormRecoveryValues,
    setAddBudgetBeneficiariesRecoveryValues,
    getBudget,
    isLoading,
    isError,
    resetFormRecoveryValues,
    currency,
  };
};

export type UseManageSingleBudgetCreation = ReturnType<
  typeof useManageSingleBudgetCreation
>;
