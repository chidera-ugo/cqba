export function getBase64String(file: string) {
  return file?.split('base64,')[1];
}
