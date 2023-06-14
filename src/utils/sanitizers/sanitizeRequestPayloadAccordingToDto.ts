export function sanitizeRequestPayloadAccordingToDto<T extends string>(
  values: Record<T, any>,
  dtoKeyList: T[],
  nestedTargetValue?: string
): Record<T, any> {
  const payload: Partial<Record<T, any>> = {};

  for (const item of dtoKeyList) {
    payload[item] = null;
  }

  for (const key in payload) {
    if (!values[key]) continue;

    payload[key] = nestedTargetValue
      ? values[key]?.[nestedTargetValue]
      : values[key];
  }

  return payload as Record<T, any>;
}
