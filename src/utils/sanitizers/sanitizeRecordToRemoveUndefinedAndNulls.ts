export function sanitizeRecordToRemoveUndefinedAndNulls<T>(
  values: T
): Record<keyof T, string> {
  // Todo: Fix typing so that the record value will be generically typed

  const res: Partial<Record<keyof T, string>> = {};

  for (const key in values) {
    const val = values[key] as any;
    res[key] = typeof val !== 'string' ? val : String(val ?? '');
  }

  return res as Record<keyof T, string>;
}
