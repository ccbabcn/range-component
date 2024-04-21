import Slider from '@/components/range/slider/slider';
import { render, fireEvent } from '@testing-library/react';

describe('GIVEN a Slider component ', () => {
  describe('WHEN instantiated', () => {
    it('THEN it should render two knobs and a progress bar', () => {
      const { getByTestId } = render(
        <Slider
          isFixedRange={false}
          minValue={100}
          maxValue={1}
          onChange={() => {}}
          percentageLeftInput={0}
          percentageRightInput={100}
          prices={[]}
          refLeftValue={0}
          refRightValue={0}
        />,
      );

      const leftKnob = getByTestId('left-knob');
      const rigthKnob = getByTestId('right-knob');
      const progessBar = getByTestId('progress-bar');

      expect(leftKnob).toBeInTheDocument();
      expect(rigthKnob).toBeInTheDocument();
      expect(progessBar).toBeInTheDocument();
    });
  });

  describe('WHEN it is rendered and the user interacts with a knob', () => {
    it('THEN should update knob position accordingly', () => {
      const mockOnChange = jest.fn();
      const { getByTestId } = render(
        <Slider
          isFixedRange={false}
          minValue={100}
          maxValue={1}
          onChange={mockOnChange}
          percentageLeftInput={0}
          percentageRightInput={100}
          prices={[]}
          refLeftValue={0}
          refRightValue={0}
        />,
      );
      const leftKnob = getByTestId('left-knob');

      fireEvent.mouseDown(leftKnob);
      fireEvent.mouseMove(document, { clientX: 15 });

      expect(leftKnob.style.left).toBe('15px');
      expect(mockOnChange).toHaveBeenCalled();
    });
  });
});
