export const formatDateOfBirth = (va: string) => {
  const value = va.split(' ').join('').split('/').join('');
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{2,8}/g);
  const match = (matches && matches[0]) || '';
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 2) {
    if (parts.length === 3) continue;
    parts.push(match.substring(i, i + (i >= 4 ? 4 : 2)));
  }

  if (parts.length) {
    return parts.join('/');
  } else {
    return value;
  }
};
