import { subtract, sum } from '../src';

describe('sum', () => {
  it('works', () => {
    expect(sum(1, 1, 2)).toEqual(4);
  });
});

describe('subtract', () => {
  it('works', () => {
    expect(subtract(5, 2)).toEqual(3);
  });
});
