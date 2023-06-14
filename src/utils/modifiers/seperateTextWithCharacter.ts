export function seperateTextWithCharacter(
  stride: number,
  value?: string,
  seperator?: string
) {
  if (!value) return value;

  let arr: any[] = [];
  const resArr: any[] = [];

  const arrLength = value.split('').length;

  function pushToResArr(val: any) {
    resArr.push(arr.join(''));
    arr = [];
    arr.push(val);
  }

  for (let i = 0; i < arrLength; i++) {
    if (arr.length < stride) {
      arr.push(value[i]);
      if (i === arrLength - 1) {
        pushToResArr(value[i]);
      }
    } else {
      pushToResArr(value[i]);
    }
  }

  if (value.length !== resArr.join('').length) return value;
  return resArr.join(seperator ?? ' ');
}
