import { PercentageFromPriceConfig } from '@/types/common';
import { getPercentageFromPrice } from '@/utils/utils';

describe('GIVEN getPercentageFromPrice function', () => {
  describe('WHEN it receives a price', () => {
    it('THEN it should return the correct percentage for a mininum price', () => {
      const percentageFromValueConfig: PercentageFromPriceConfig = {
        price: 10,
        minPrice: 10,
        maxPrice: 100,
      };
      const expectedPercentage = 0;

      const percentage = getPercentageFromPrice(percentageFromValueConfig);

      expect(percentage).toEqual(expectedPercentage);
    });
    it('THEN it should return the correct percentage for a maximun price', () => {
      const percentageFromValueConfig: PercentageFromPriceConfig = {
        price: 100,
        minPrice: 10,
        maxPrice: 100,
      };
      const expectedPercentage = 100;

      const percentage = getPercentageFromPrice(percentageFromValueConfig);

      expect(percentage).toEqual(expectedPercentage);
    });
    it('THEN it should return the correct percentage for a price on the middle', () => {
      const percentageFromValueConfig: PercentageFromPriceConfig = {
        price: 50,
        minPrice: 0,
        maxPrice: 100,
      };
      const expectedPercentage = 50;

      const percentage = getPercentageFromPrice(percentageFromValueConfig);

      expect(percentage).toEqual(expectedPercentage);
    });
  });
});
