import { generateUUID } from 'utils/generators/generateUUID';

export const generatePlaceholderArray = (count: number, asNumber?: boolean) => {
  const arr = [];

  for (let i = 0; i < count; i++) {
    if (asNumber) {
      arr.push(i + 1);
    } else {
      arr.push(generateUUID());
    }
  }
  return arr;
};
