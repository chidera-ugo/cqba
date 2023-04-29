interface Args {
  data: any[];
  sortBy?: string;
  direction?: 'asc' | 'desc';
  disabled?: boolean;
}

export function handleSort({
  direction = 'asc',
  disabled,
  data,
  sortBy,
}: Args) {
  if (disabled) return data;

  if (!sortBy) {
    return data.sort((a, b) => {
      if (a < b) return direction === 'asc' ? -1 : 1;
      if (a > b) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return data.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return direction === 'asc' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}
