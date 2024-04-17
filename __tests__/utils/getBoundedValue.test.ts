import { getBoundedValue } from '@/app/utils';

describe('GIVEN getBoundedValue function', () => {
  describe('WHEN the new value is within the min and max limits', () => {
    it('THEN it should return the new value', () => {
      const newValue = 5;
      const minLimit = 0;
      const maxLimit = 10;

      const result = getBoundedValue(newValue, minLimit, maxLimit);

      expect(result).toBe(newValue);
    });
  });

  describe('WHEN the new value is less than the min limit', () => {
    it('THEN it should return the min limit', () => {
      const newValue = -1;
      const minLimit = 0;
      const maxLimit = 10;

      const result = getBoundedValue(newValue, minLimit, maxLimit);

      expect(result).toBe(minLimit);
    });
  });

  describe('WHEN the new value is greater than the max limit', () => {
    it('THEN it should return the max limit', () => {
      const newValue = 15;
      const minLimit = 0;
      const maxLimit = 10;

      const result = getBoundedValue(newValue, minLimit, maxLimit);

      expect(result).toBe(maxLimit);
    });
  });
});
