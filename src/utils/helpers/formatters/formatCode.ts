export function formatCode(code: Record<string, unknown>) {
  const vals = [];
  for (const i in code) {
    vals.push(code[i]);
  }

  return vals.join('');
}
