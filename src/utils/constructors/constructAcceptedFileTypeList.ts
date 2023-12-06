export function constructAcceptedFileTypeList(extensions: string[]) {
  if (!extensions?.length) return '';

  const arr = [];

  for (const item of extensions) arr.push(`.${item}`);

  return arr.join(', ');
}
