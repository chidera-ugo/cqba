export function convertToUrlString(val: string) {
  return val.split(' ').join('-').toLowerCase();
}
