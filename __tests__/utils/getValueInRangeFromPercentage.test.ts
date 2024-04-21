import {
  PositionFromPercentageConfig,
  PriceFromPercentageConfig,
  ValueFromRangeConfig,
} from '@/types/common';
import {
  getPositionInRangeFromPercentage,
  getPriceInRangeFromPercentage,
  getValueInRangeFromPercentage,
} from '@/utils/utils';

describe('GIVEN getValueInRangeFromPercentage function', () => {
  describe('WHEN it receives a percentage and a value range', () => {
    it('THEN it should return the correct value for a 0 percentage', () => {
      const expectedValue = 10;
      const valueFromPercentageConfig: ValueFromRangeConfig = {
        current: 0,
        min: 10,
        max: 100,
      };

      const value = getValueInRangeFromPercentage(valueFromPercentageConfig);

      expect(value).toEqual(expectedValue);
    });
    it('THEN it should return the correct value for a max percentage', () => {
      const expectedValue = 100;
      const valueFromPercentageConfig: ValueFromRangeConfig = {
        current: 100,
        min: 10,
        max: 100,
      };

      const value = getValueInRangeFromPercentage(valueFromPercentageConfig);

      expect(value).toEqual(expectedValue);
    });
    it('THEN it should return the correct value for a middle percentage', () => {
      const expectedValue = 50;
      const valueFromPercentageConfig: ValueFromRangeConfig = {
        current: 50,
        min: 0,
        max: 100,
      };

      const value = getValueInRangeFromPercentage(valueFromPercentageConfig);

      expect(value).toEqual(expectedValue);
    });
  });
});
describe('GIVEN getPriceInRangeFromPercentage function', () => {
  describe('WHEN it receives a percentage and a price range', () => {
    it('THEN it should return the correct price for a 0 percentage', () => {
      const expectedPrice = 10;
      const priceFromPercentageConfig: PriceFromPercentageConfig = {
        currentPercentage: 0,
        minPrice: 10,
        maxPrice: 100,
      };

      const price = getPriceInRangeFromPercentage(priceFromPercentageConfig);

      expect(price).toEqual(expectedPrice);
    });
  });
});

describe('GIVEN getPositionInRangeFromPercentage function', () => {
  describe('WHEN it receives a percentage and a position range', () => {
    it('THEN it should return the correct position for a 0 percentage', () => {
      const expectedPosition = 10;
      const positionFromPercentageConfig: PositionFromPercentageConfig = {
        currentPercentage: 0,
        minPosition: 10,
        maxPosition: 100,
      };

      const position = getPositionInRangeFromPercentage(
        positionFromPercentageConfig,
      );

      expect(position).toEqual(expectedPosition);
    });
  });
});
