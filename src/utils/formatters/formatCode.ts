export function formatCode(code: Record<string, unknown>) {
  const vals = [];
  for (const key in code) {
    vals.push(code[key]);
  }

  return vals.join('');
}
