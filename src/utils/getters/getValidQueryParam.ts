export function getValidQueryParam(query: unknown) {
  return typeof query === 'string' ? query : '';
}
