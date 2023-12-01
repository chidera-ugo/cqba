export type MultiCheckValue = Record<string, boolean>;

export function validateMultiCheckValues(obj: MultiCheckValue) {
  if (!obj) return false;
  return !!Object.values(obj)?.filter((val) => !!val)?.length;
}
