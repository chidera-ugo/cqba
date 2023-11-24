// export function sanitizeRecordToRemoveUndefinedAndNulls<T>(values: T) {
//   const res: Partial<Record<keyof T, unknown>> = {};
//
//   for (const key in values) {
//     const val = values[key] as any;
//     res[key] = typeof val !== 'string' ? val : val ?? '';
//   }
//
//   return res as Record<keyof T, unknown>;
// }

export function sanitizeRecordToRemoveUndefinedAndNulls<T>(values: T) {
  const res: Partial<Record<keyof T, any>> = {};

  for (const key in values) {
    const val = values[key] as any;

    res[key] = typeof val !== 'string' ? val ?? '' : val ?? '';
  }

  return res as Record<keyof T, any>;
}
