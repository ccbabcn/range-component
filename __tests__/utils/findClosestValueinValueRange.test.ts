import { findClosestValueinValueRange } from '@/utils/utils';

describe('GIVEN a findClosestValueinValueRange function', () => {
  describe('WHEN it receives a list of values and a current value', () => {
    it('THEN itshould return the closest value in the range to the current value', () => {
      const expectedValue = 5;

      const closestValue = findClosestValueinValueRange({
        values: [1, 3, 5, 7, 9],
        prev: 0,
        next: 4,
        currentValue: 6,
      });

      expect(closestValue).toBe(expectedValue);
    });
    it('THEN it should return the previous value when the next value is out of range', () => {
      const expectedValue = 5;

      const closestValue = findClosestValueinValueRange({
        values: [1, 3, 5],
        prev: 0,
        next: 3,
        currentValue: 6,
      });

      expect(closestValue).toBe(expectedValue);
    });

    it('THEN it should return the first value when the current value is below range', () => {
      const expectedValue = 3;

      const closestValue = findClosestValueinValueRange({
        values: [3, 5],
        prev: 0,
        next: 1,
        currentValue: 1,
      });

      expect(closestValue).toBe(expectedValue);
    });
  });
});
