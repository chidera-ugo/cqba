export const formatPhoneNumber = (value: string) => {
  if (value?.startsWith('+234')) return value.substring(4);
  return value;
};
