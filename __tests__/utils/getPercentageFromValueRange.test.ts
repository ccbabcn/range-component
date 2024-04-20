import { ValueFromRangeConfig } from '@/types/common';
import { getPercentageFromValueRange } from '@/utils/utils';

describe('GIVEN getPercentageFromValueRange function', () => {
  describe('WHEN it receives a value', () => {
    it('THEN it should return the correct percentage for a mininum value', () => {
      const percentageFromValueConfig: ValueFromRangeConfig = {
        current: 10,
        min: 10,
        max: 100,
      };
      const expectedPercentage = 0;

      const percentage = getPercentageFromValueRange(percentageFromValueConfig);

      expect(percentage).toEqual(expectedPercentage);
    });
    it('THEN it should return the correct percentage for a maximun value', () => {
      const percentageFromValueConfig: ValueFromRangeConfig = {
        current: 100,
        min: 10,
        max: 100,
      };
      const expectedPercentage = 100;

      const percentage = getPercentageFromValueRange(percentageFromValueConfig);

      expect(percentage).toEqual(expectedPercentage);
    });
    it('THEN it should return the correct percentage for a value on the middle', () => {
      const percentageFromValueConfig: ValueFromRangeConfig = {
        current: 50,
        min: 0,
        max: 100,
      };
      const expectedPercentage = 50;

      const percentage = getPercentageFromValueRange(percentageFromValueConfig);

      expect(percentage).toEqual(expectedPercentage);
    });
  });
});
