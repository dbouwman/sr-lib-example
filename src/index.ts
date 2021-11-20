export const sum = (nums: number[], factor: number): number => {
  return (
    factor *
    nums.reduce((total: number, n: number) => {
      return total + n;
    }, 0)
  );
};

export const subtract = (a: number, b: number): number => {
  return a - b;
};