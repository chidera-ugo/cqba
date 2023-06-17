export function sanitizeRecordToRemoveUndefinedAndNulls<T>(
  values: T
): Record<keyof T, string> {
  const res: Partial<Record<keyof T, string>> = {};

  for (const key in values) {
    res[key] = String(values[key] ?? '');
  }

  return res as Record<keyof T, string>;
}
