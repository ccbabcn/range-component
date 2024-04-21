import { GuardIsNanConfig } from '@/types/common';
import { guardIsNan } from '@/utils/utils';

describe('GIVEN guardIsNan function', () => {
  describe('WHEN it receives a value and a default value', () => {
    it('THEN it should return the default value when the value is NaN', () => {
      const expectedValue = 10;
      const guardIsNanConfig: GuardIsNanConfig = {
        value: 'test',
        defaultValue: 10,
      };

      const value = guardIsNan(guardIsNanConfig);

      expect(value).toEqual(expectedValue);
    });
    it('THEN it should return the value when the value is a number', () => {
      const expectedValue = 20;
      const guardIsNanConfig: GuardIsNanConfig = {
        value: 20,
        defaultValue: 10,
      };

      const value = guardIsNan(guardIsNanConfig);

      expect(value).toEqual(expectedValue);
    });
    it('THEN it should return the value rounded when the value is a number and shouldRound is true', () => {
      const expectedValue = 21;
      const guardIsNanConfig: GuardIsNanConfig = {
        value: 20.99,
        defaultValue: 10,
        shouldRound: true,
      };

      const value = guardIsNan(guardIsNanConfig);

      expect(value).toEqual(expectedValue);
    });
  });
});
