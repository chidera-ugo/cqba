export function getDeepNestedObjectValue(
  object: Record<string, any>,
  accessorKey: string
) {
  try {
    if (accessorKey?.includes('.')) {
      let result = object;

      for (const key of accessorKey?.split('.')) {
        result = result?.[key];

        if (process.env.NODE_ENV !== 'production' && result === undefined) {
          console.warn(
            `"${key}" in deeply nested key "${accessorKey}" returned undefined.`
          );
        }
      }

      return result;
    } else {
      return object?.[accessorKey];
    }
  } catch (e) {
    return null;
  }
}
