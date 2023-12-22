import { alphabets } from 'constants/alphabets';

export const useGetColorByChar = () => {
  const colors = [
    '#0abdc4',
    '#f1a543',
    '#F34141',
    '#2F5D94',
    '#1cb0ff',
    '#a1bd33',
    '#942f92',
  ];

  const charsArr: string[] = [];

  for (let i = 0; i < alphabets.length; i = i + colors.length) {
    charsArr.push(alphabets.slice(i, i + colors.length).join(''));
  }

  function getColor(char?: string | number) {
    if (char === undefined || !char) return '#989898';

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
