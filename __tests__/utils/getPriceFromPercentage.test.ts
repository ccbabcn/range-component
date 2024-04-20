import { PriceFromPercentageConfig } from '@/types/common';
import { getPriceFromPercentage } from '@/utils/utils';

describe('GIVEN getPriceFromPercentage function', () => {
  describe('WHEN it receives a percentage', () => {
    it('THEN it should return the correct price for a 0 percentage', () => {
      const valueFromPercentageConfig: PriceFromPercentageConfig = {
        percentage: 0,
        minPrice: 10,
        maxPrice: 100,
      };
      const expectedValue = 10;

      const value = getPriceFromPercentage(valueFromPercentageConfig);

      expect(value).toEqual(expectedValue);
    });
    it('THEN it should return the correct price for a max percentage', () => {
      const valueFromPercentageConfig: PriceFromPercentageConfig = {
        percentage: 100,
        minPrice: 10,
        maxPrice: 100,
      };
      const expectedValue = 100;

      const value = getPriceFromPercentage(valueFromPercentageConfig);

      expect(value).toEqual(expectedValue);
    });
    it('THEN it should return the correct price for a middle percentage', () => {
      const valueFromPercentageConfig: PriceFromPercentageConfig = {
        percentage: 50,
        minPrice: 0,
        maxPrice: 100,
      };
      const expectedValue = 50;

      const value = getPriceFromPercentage(valueFromPercentageConfig);

      expect(value).toEqual(expectedValue);
    });
  });
});
