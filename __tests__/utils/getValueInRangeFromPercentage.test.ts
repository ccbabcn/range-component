import { ValueFromRangeConfig } from '@/types/common';
import { getValueInRangeFromPercentage } from '@/utils/utils';

describe('GIVEN getValueInRangeFromPercentage function', () => {
  describe('WHEN it receives a percentage', () => {
    it('THEN it should return the correct value for a 0 percentage', () => {
      const valueFromPercentageConfig: ValueFromRangeConfig = {
        current: 0,
        min: 10,
        max: 100,
      };
      const expectedValue = 10;

      const value = getValueInRangeFromPercentage(valueFromPercentageConfig);

      expect(value).toEqual(expectedValue);
    });
    it('THEN it should return the correct value for a max percentage', () => {
      const valueFromPercentageConfig: ValueFromRangeConfig = {
        current: 100,
        min: 10,
        max: 100,
      };
      const expectedValue = 100;

      const value = getValueInRangeFromPercentage(valueFromPercentageConfig);

      expect(value).toEqual(expectedValue);
    });
    it('THEN it should return the correct value for a middle percentage', () => {
      const valueFromPercentageConfig: ValueFromRangeConfig = {
        current: 50,
        min: 0,
        max: 100,
      };
      const expectedValue = 50;

      const value = getValueInRangeFromPercentage(valueFromPercentageConfig);

      expect(value).toEqual(expectedValue);
    });
  });
});
