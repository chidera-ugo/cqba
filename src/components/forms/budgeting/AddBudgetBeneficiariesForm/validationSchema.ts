import { sanitizeAmount } from 'utils/formatters/formatAmount';
import { validateMultiCheckValues } from 'utils/validators/validateMultiCheckValues';
import { object } from 'yup';

export const validationSchema = object({
  beneficiaries: object().test('min', 'Please select beneficiaries', (value) =>
    validateMultiCheckValues(value)
  ),
  allocations: object()
    .test('required', 'Specify allocation for beneficiaries', (val, ctx) => {
      const numberOfBeneficiariesSelected = Object.values(
        ctx.parent.beneficiaries
      )?.filter((val) => !!val)?.length;

      if (!ctx.parent.rules || numberOfBeneficiariesSelected === 1) return true;

      return (
        Object.values(val)?.filter((val) => {
          const _val = Number(
            sanitizeAmount({ value: val as string, returnTrueAmount: true })
          );

          return _val > 0;
        })?.length === numberOfBeneficiariesSelected
      );
    })
    .test('required', 'Total is more than budget', (val, ctx) => {
      if (!ctx.parent.rules) return true;

      const budgetAmount = Number(
        sanitizeAmount({
          value: ctx.parent.budgetAmount,
          returnTrueAmount: true,
        })
      );

      const allocations = Object.values(val);

      const sumOfSplitting = !!allocations.length
        ? allocations
            ?.map((val) =>
              Number(
                sanitizeAmount({ value: val as string, returnTrueAmount: true })
              )
            )
            .reduce((a, b) => a + b)
        : 0;

      const isInvalid = sumOfSplitting > budgetAmount;

      return !isInvalid;
    }),
});
