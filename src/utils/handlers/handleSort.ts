interface Args<T> {
  data?: T[];
  sortBy?: keyof T;
  direction?: 'asc' | 'desc';
  disabled?: boolean;
}

export function handleSort<T>({
  direction = 'asc',
  disabled,
  data: _data,
  sortBy,
}: Args<T>) {
  const data = [...(_data ?? [])];

  if (disabled) return data ?? [];

  if (!sortBy)
    return (
      data?.sort((a, b) => {
        if (a < b) return direction === 'desc' ? -1 : 1;
        if (a > b) return direction === 'desc' ? 1 : -1;
        return 0;
      }) ?? []
    );

  return (
    data?.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return direction === 'desc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return direction === 'desc' ? 1 : -1;
      return 0;
    }) ?? []
  );
}
