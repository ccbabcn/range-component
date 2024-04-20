import { getBoundedValue } from '@/utils/utils';

describe('GIVEN getBoundedValue function', () => {
  describe('WHEN the new value is within the min and max limits', () => {
    it('THEN it should return the new value', () => {
      const value = 5;
      const minLimit = 0;
      const maxLimit = 10;

      const result = getBoundedValue({ value, minLimit, maxLimit });

      expect(result).toBe(value);
    });
  });

  describe('WHEN the new value is less than the min limit', () => {
    it('THEN it should return the min limit', () => {
      const value = -1;
      const minLimit = 0;
      const maxLimit = 10;

      const result = getBoundedValue({ value, minLimit, maxLimit });

      expect(result).toBe(minLimit);
    });
  });

  describe('WHEN the new value is greater than the max limit', () => {
    it('THEN it should return the max limit', () => {
      const value = 15;
      const minLimit = 0;
      const maxLimit = 10;

      const result = getBoundedValue({ value, minLimit, maxLimit });

      expect(result).toBe(maxLimit);
    });
  });
});
