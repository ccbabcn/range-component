import Knob from '@/components/range/knob/knob';
import { render, fireEvent } from '@testing-library/react';

describe('GIVEN a Knob Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('WHEN it is instantiated', () => {
    it('THEN it should render the component', () => {
      const mockOnChange = jest.fn();
      const { getByTestId } = render(
        <Knob
          currentValue={0}
          fixedPercentages={[]}
          isFixedRange={false}
          isLeft={true}
          minLimit={0}
          maxLimit={100}
          minValue={0}
          maxValue={100}
          percentValue={50}
          onChange={mockOnChange}
        />,
      );

      const knobElement = getByTestId('left-knob');
      expect(knobElement).toBeInTheDocument();
    });
    it('THEN it should contain all the accessible elements', () => {
      const mockOnChange = jest.fn();
      const { getByTestId, getByLabelText } = render(
        <Knob
          currentValue={0}
          fixedPercentages={[]}
          isFixedRange={false}
          isLeft={true}
          minLimit={0}
          maxLimit={100}
          minValue={0}
          maxValue={100}
          percentValue={50}
          onChange={mockOnChange}
        />,
      );

      const knobElement = getByTestId('left-knob');
      const knobLabel = getByLabelText('range');
      expect(knobElement).toBeInTheDocument();
      expect(knobLabel).toBeInTheDocument();
      expect(knobElement.style.left).toBe('7.5px');
    });
  });
  describe('WHEN it is rendered an the user interacts with the mouse', () => {
    it('THEN it should handle mouse down event', () => {
      const mockOnChange = jest.fn();
      const { getByTestId } = render(
        <Knob
          currentValue={0}
          fixedPercentages={[]}
          isFixedRange={false}
          isLeft={false}
          minLimit={0}
          maxLimit={100}
          minValue={0}
          maxValue={100}
          percentValue={50}
          onChange={mockOnChange}
        />,
      );

      const knobElement = getByTestId('right-knob');
      fireEvent.mouseDown(knobElement);
      fireEvent.mouseMove(knobElement);

      expect(mockOnChange).toHaveBeenCalled();
    });
  });
  describe('WHEN it is rendered an the user interacts through touch', () => {
    it('THEN it should handle touch start event', () => {
      const mockOnChange = jest.fn();

      const { getByTestId } = render(
        <div className="min-w-[200px]">
          <Knob
            currentValue={0}
            fixedPercentages={[]}
            isFixedRange={false}
            isLeft={false}
            minLimit={0}
            maxLimit={100}
            minValue={0}
            maxValue={100}
            percentValue={50}
            onChange={mockOnChange}
          />
        </div>,
      );
      const knobElement = getByTestId('right-knob');
      fireEvent.touchMove(knobElement);

      expect(mockOnChange).toHaveBeenCalled();
    });
  });
});
