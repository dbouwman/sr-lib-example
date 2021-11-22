import { downcase, mult, subtract, sum } from '../src';

describe('sum', () => {
  it('works', () => {
    expect(sum([1, 1, 2], 2)).toEqual(8);
  });
});

describe('subtract', () => {
  it('works', () => {
    expect(subtract(5, 2, 1)).toEqual(2);
  });
});

describe('mult', () => {
  it('works', () => {
    expect(mult(2, 5)).toEqual(10);
  });
});

describe('downcase', () => {
  it('works', () => {
    expect(downcase('LARRY')).toEqual('larry');
  });
});
