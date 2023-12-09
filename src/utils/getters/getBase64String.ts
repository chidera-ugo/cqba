export function getBase64String(file: string) {
  return file?.split('base64,')[1];
}

export function appendBase64Prefix(file: string) {
  return `data:image/jpeg;base64,${file}`;
}
