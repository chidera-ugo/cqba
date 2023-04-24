import { generateUUID } from 'utils/helpers/generateUUID';

export const generatePlaceholderArray = (count: number) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(generateUUID());
  }
  return arr;
};
