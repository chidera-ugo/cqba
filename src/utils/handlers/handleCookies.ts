import Cookies from 'js-cookie';

export const getCookie = (key: string): any => {
  const val = Cookies.get(key);
  if (!val) return null;

  try {
    return JSON.parse(val);
  } catch (error) {
    if (typeof val === 'string') return val;
    return null;
  }
};

export const saveCookie = (
  key: string,
  value: Record<string, any>,
  expires?: Date,
  update?: boolean
) => {
  const existingItem = getCookie(key) as any;
  const options: Record<string, unknown> = {};

  if (!!expires) {
    options['expires'] = expires;
  }

  Cookies.set(
    key,
    typeof value === 'string'
      ? value
      : JSON.stringify(
          update
            ? {
                ...existingItem,
                ...value,
              }
            : value
        ),
    {
      ...options,
    }
  );
};

export const removeCookie = (key: string) => {
  Cookies.set(key, '', {
    expires: new Date('01-01-1970'),
  });
};
