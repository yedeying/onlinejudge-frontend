export const numToAlpha = (index: number): string => {
  let base = index;
  const resArr: number[] = [];
  while (base >= 0) {
    resArr.unshift(base % 26);
    base = (base - (base % 26)) / 26;
    if (base === 0) {
      break;
    }
  }
  const baseAlpha = 'A'.charCodeAt(0);

  return resArr.map((digit, index) => {
    const alphaDigit = index === 0 && index !== resArr.length - 1 ? digit - 1 : digit;
    return String.fromCharCode(baseAlpha + alphaDigit);
  }).join('');
};

export const alphaToNum = (alpha: string): number => {
  const baseAlpha = 'A'.charCodeAt(0);
  const alphaDigits = alpha.split('').map((char, index) => {
    return char.charCodeAt(0) - baseAlpha + (index === 0 && index !== alpha.length - 1 ? 1 : 0);
  });
  let base = 0;
  for (const digit of alphaDigits) {
    base = base * 26 + digit;
  }
  return base;
};

export const keepDigit = (num: number, digit: number = num.toString().length): string => {
  let res = num.toString();
  while (res.length < digit) {
    res = `0${res}`;
  }
  return res;
};

export const formatNo = (volume: number, num: number) => {
  return numToAlpha(volume) + keepDigit(num, 2);
};

export const idToNo = (id: number) => {
  const num = id % 100;
  const volume = (id - num) % 100;
  return formatNo(volume, num);
};
