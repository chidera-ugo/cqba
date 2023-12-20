export const appendCountryCode = (number: string) => {
  if (!number) return '';
  if (number.includes('+234')) return number;
  return `+234${
    number?.charAt(0) === '0'
      ? number.substring(1, 11)
      : number.substring(0, 10)
  }`;
};
