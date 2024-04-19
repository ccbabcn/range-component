import { LeftAndRightValues } from '@/types/common';
import { ValueToPercentageConfig } from '@/types/range';
import { getValueFromPercentage } from '@/utils/utils';

describe('GIVEN getValueFromPercentages function', () => {
  describe('WHEN both percentages resolve to a equal value', () => {
    it('THEN it should return the correct value if percentages are zero', () => {
      const valuesFromPercentageConfig: ValueToPercentageConfig = {
        leftPercentage: 0,
        rightPercentage: 0,
        minPrice: 10,
        maxPrice: 100,
      };
      const expectedValues: LeftAndRightValues = {
        leftValue: 10,
        rightValue: 11,
      };

      const values = getValueFromPercentage(valuesFromPercentageConfig);

      expect(values).toEqual(expectedValues);
    });
    it('THEN it should return the correct value if left percentage is bigger', () => {
      const valuesFromPercentageConfig: ValueToPercentageConfig = {
        leftPercentage: 20,
        rightPercentage: 80,
        minPrice: 10,
        maxPrice: 100,
      };
      const expectedValues: LeftAndRightValues = {
        leftValue: 28,
        rightValue: 82,
      };

      const values = getValueFromPercentage(valuesFromPercentageConfig);

      expect(values).toEqual(expectedValues);
    });
    it('THEN it should return the correct value if right percentage is bigger', () => {
      const valuesFromPercentageConfig: ValueToPercentageConfig = {
        leftPercentage: 100,
        rightPercentage: 100,
        minPrice: 10,
        maxPrice: 100,
      };
      const expectedValues: LeftAndRightValues = {
        leftValue: 99,
        rightValue: 100,
      };

      const values = getValueFromPercentage(valuesFromPercentageConfig);

      expect(values).toEqual(expectedValues);
    });
  });
});
