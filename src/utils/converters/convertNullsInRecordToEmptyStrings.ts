export function convertNullsInRecordToEmptyStrings<T>(payload: T): T {
  const res: Record<string, any> = {};

  for (const key in payload) {
    if (payload[key] === null) {
      res[key] = '';
    } else {
      res[key] = payload[key];
    }
  }

  return res as T;
}
