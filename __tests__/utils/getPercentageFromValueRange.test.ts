import {
  PercentageFromPositionConfig,
  PercentageFromPriceConfig,
  ValueFromRangeConfig,
} from '@/types/common';
import {
  getPercentageFromPositionRange,
  getPercentageFromPriceRange,
  getPercentageFromValueRange,
} from '@/utils/utils';

describe('GIVEN getPercentageFromValueRange function', () => {
  describe('WHEN it receives a value', () => {
    it('THEN it should return the correct percentage for a mininum value', () => {
      const expectedPercentage = 0;
      const percentageFromValueConfig: ValueFromRangeConfig = {
        current: 10,
        min: 10,
        max: 100,
      };

      const percentage = getPercentageFromValueRange(percentageFromValueConfig);

      expect(percentage).toEqual(expectedPercentage);
    });
    it('THEN it should return the correct percentage for a maximun value', () => {
      const expectedPercentage = 100;
      const percentageFromValueConfig: ValueFromRangeConfig = {
        current: 100,
        min: 10,
        max: 100,
      };

      const percentage = getPercentageFromValueRange(percentageFromValueConfig);

      expect(percentage).toEqual(expectedPercentage);
    });
    it('THEN it should return the correct percentage for a value on the middle', () => {
      const expectedPercentage = 50;
      const percentageFromValueConfig: ValueFromRangeConfig = {
        current: 50,
        min: 0,
        max: 100,
      };

      const percentage = getPercentageFromValueRange(percentageFromValueConfig);

      expect(percentage).toEqual(expectedPercentage);
    });
  });
});
describe('GIVEN getPercentageFromPriceRange function', () => {
  describe('WHEN it receives a price inside a range', () => {
    it('THEN it should return the correct percentage', () => {
      const expectedPercentage = 0;
      const percentageFromPriceConfig: PercentageFromPriceConfig = {
        currentPrice: 10,
        minPrice: 10,
        maxPrice: 100,
      };

      const percentage = getPercentageFromPriceRange(percentageFromPriceConfig);

      expect(percentage).toEqual(expectedPercentage);
    });
  });
});
describe('GIVEN getPercentageFromPositionRange function', () => {
  describe('WHEN it receives a position inside a range', () => {
    it('THEN it should return the correct percentage', () => {
      const expectedPercentage = 0;
      const percentageFromPositionConfig: PercentageFromPositionConfig = {
        currentPosition: 10,
        minPosition: 10,
        maxPosition: 100,
      };

      const percentage = getPercentageFromPositionRange(
        percentageFromPositionConfig,
      );

      expect(percentage).toEqual(expectedPercentage);
    });
  });
});
