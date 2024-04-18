import { getObjectLimitsWithinParent } from '@/utils/utils';

describe('GIVEN getObjectLimitsWithinParent function', () => {
  describe('WHEN the parent element and the object element are provided', () => {
    it('THEN it should calculate the correct limits within the parent element', () => {
      const parentElement = document.createElement('div');
      parentElement.style.width = '500px';
      const objectElement = document.createElement('div');
      objectElement.style.width = '50px';

      document.body.appendChild(parentElement);
      parentElement.appendChild(objectElement);

      const parentRef = { current: parentElement };
      const limits = getObjectLimitsWithinParent(parentRef, 50);

      expect(limits.min).toBe(25);
      expect(limits.max).toBe(-25);

      document.body.removeChild(parentElement);
    });
  });
});
