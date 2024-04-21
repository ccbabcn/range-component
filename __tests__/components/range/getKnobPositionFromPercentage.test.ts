import getKnobPositionFromPercentage from '@/components/range/knob/getKnobPositionFromPercentage';

describe('GIVEN getKnobPositionFromPercentage function', () => {
  describe('WHEN it is invoked with the correct parameters', () => {
    it('THEN it should return a correct position for a left knob', () => {
      const expectedPosition = 45;

      const position = getKnobPositionFromPercentage({
        isLeft: true,
        knobSize: 20,
        knobHalfSize: 10,
        parentWidth: 100,
        percentValue: 50,
      });

      expect(position).toBe(expectedPosition);
    });

    it('THEN it should return a correct position for a right knob', () => {
      const expectedPosition = 60;

      const position = getKnobPositionFromPercentage({
        isLeft: false,
        knobSize: 20,
        knobHalfSize: 10,
        parentWidth: 100,
        percentValue: 50,
      });

      expect(position).toBe(expectedPosition);
    });
  });
});
