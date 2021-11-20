export const sum = (a: number, b: number, c: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b + c;
};
