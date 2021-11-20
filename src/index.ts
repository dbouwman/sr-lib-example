export const sum = (nums: number[]): number => {
  return nums.reduce((total: number, n: number) => {
    return total + n;
  }, 0);
};

export const subtract = (a: number, b: number): number => {
  return a - b;
};
