import { AddBudgetBeneficiariesFormRecoveryValues } from 'components/forms/budgeting/AddBudgetBeneficiariesForm';
import { CreateBudgetFormRecoveryValues } from 'components/forms/budgeting/CreateBudgetForm';
import { BudgetPriorities, BudgetPriority } from 'enums/budget';
import {
  Beneficiary,
  CreateBudgetDto,
} from 'hooks/api/budgeting/useCreateBudget';
import { useManageWallets } from 'hooks/wallet/useManageWallets';
import { useState } from 'react';
import { sanitizeAmount } from 'utils/formatters/formatAmount';

export const useManageSingleBudgetCreation = () => {
  const [createBudgetFormRecoveryValues, setCreateBudgetFormRecoveryValues] =
    useState<CreateBudgetFormRecoveryValues>(null);

  const [
    addBudgetBeneficiariesFormRecoveryValues,
    setAddBudgetBeneficiariesRecoveryValues,
  ] = useState<AddBudgetBeneficiariesFormRecoveryValues>(null);

  const { primaryWallet, isError, isLoading } = useManageWallets();

  const currency = primaryWallet?.currency;

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
        if (beneficiaries[i])
          arr.push({
            user: i,
            allocation:
              (!splittingRules
                ? _budgetAmount / count
                : count === 1
                ? _budgetAmount
                : Number(
                    sanitizeAmount({
                      value: allocations[i]!,
                      returnTrueAmount: true,
                    })
                  )) * 100,
          });
      }

      return arr;
    }

    return {
      name: title,
      description,
      priority: BudgetPriorities[priority as BudgetPriority],
      beneficiaries: getBeneficiaries(),
      currency,
      amount:
        parseInt(sanitizeAmount({ value: amount, returnTrueAmount: true })) *
        100,
      threshold:
        parseInt(
          sanitizeAmount({
            value: !threshold ? amount : allocation,
            returnTrueAmount: true,
          })
        ) * 100,
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
