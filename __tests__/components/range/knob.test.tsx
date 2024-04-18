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
          maxLimit={100}
          minLimit={0}
          percentValue={50}
          isLeft={true}
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
          maxLimit={100}
          minLimit={0}
          percentValue={50}
          isLeft={true}
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
          maxLimit={100}
          minLimit={0}
          percentValue={0}
          isLeft={false}
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
            maxLimit={100}
            minLimit={0}
            percentValue={50}
            isLeft={false}
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
