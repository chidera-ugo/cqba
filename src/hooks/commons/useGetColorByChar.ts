import { alphabets } from 'constants/alphabets';

export const useGetColorByChar = () => {
  const colors = [
    '#2F9461',
    '#A35C00',
    '#F34141',
    '#2F5D94',
    '#942F47',
    '#8C2F94',
    '#94722F',
  ];

  const charsArr: string[] = [];

  for (let i = 0; i < alphabets.length; i = i + colors.length) {
    charsArr.push(alphabets.slice(i, i + colors.length).join(''));
  }

  function getColor(char?: string | number) {
    if (char === undefined) return '#000000';

    if (typeof char === 'number') {
      return colors[char] ?? colors[char % colors.length]!;
    }

    return (
      colors[
        charsArr[
          Math.floor(alphabets.indexOf(char.toUpperCase()) / colors.length)
        ]?.indexOf(char.toUpperCase()) ?? 0
      ] ?? ''
    );
  }

  return {
    getColor,
  };
};

export type GetColorByChar = ReturnType<typeof useGetColorByChar>['getColor'];
