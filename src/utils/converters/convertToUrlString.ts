export function convertToUrlString(val: string) {
  return val?.replaceAll(' ', '-').toLowerCase().replaceAll("'", '');
}
