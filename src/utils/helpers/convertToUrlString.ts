export function convertToUrlString(val: string) {
  if (typeof val !== 'string') return '';
  return val?.split(' ').join('-').toLowerCase();
}
