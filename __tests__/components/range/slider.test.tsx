import Slider from '@/components/range/slider/slider';
import { render, fireEvent } from '@testing-library/react';

describe('GIVEN a Slider component ', () => {
  describe('WHEN instantiated', () => {
    it('THEN it should render two knobs and a progress bar', () => {
      const { getByTestId } = render(<Slider />);

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
      const { getByTestId } = render(<Slider />);
      const leftKnob = getByTestId('left-knob');

      fireEvent.mouseDown(leftKnob);
      fireEvent.mouseMove(document, { clientX: 15 });

      expect(leftKnob.style.left).toBe('15px');
    });
  });
});
