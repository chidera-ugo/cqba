export function getEnumKeyByEnumValue<T extends { [index: string]: string }>(
  _enum: T,
  enumValue?: string
) {
  if (_enum && enumValue) {
    const keys = Object.keys(_enum).filter((x) => _enum[x] == enumValue);
    return keys?.length > 0 ? keys[0] : null;
  }

  return '';
}
