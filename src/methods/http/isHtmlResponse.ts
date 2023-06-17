export function isHtmlResponse(data: any) {
  if (typeof data !== 'string') return false;

  const chunk = data.substring(0, 20).toLowerCase();

  return chunk.includes('<!doctype html');
}
