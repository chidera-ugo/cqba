export const getFromLocalStore = (query: string, session?: boolean) => {
  try {
    const res = (session ? sessionStorage : localStorage).getItem(query);
    if (!res) return null;
    return JSON.parse(res);
  } catch (e) {
    return null;
  }
};

export const saveToLocalStore = (
  query: string,
  payload: Record<string, any>,
  session?: boolean
) => {
  (session ? sessionStorage : localStorage).setItem(
    query,
    JSON.stringify(payload)
  );
};

export const deleteFromLocalStore = (query: string, session?: boolean) => {
  (session ? sessionStorage : localStorage).removeItem(query);
};
