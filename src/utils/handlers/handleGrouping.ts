export const handleGrouping = <T>(
  data: T[],
  key: keyof T,
  ungrouped?: boolean
) => {
  if (ungrouped) {
    return {
      ungrouped: data,
    };
  } else {
    return data.reduce(function (storage: any, item) {
      const group = item[key];
      storage[group] = storage[group] || [];
      storage[group].push(item);
      return storage;
    }, {});
  }
};
