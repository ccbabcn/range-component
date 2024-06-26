import { render, act } from '@testing-library/react';
import useMouseMove from '@/components/range/knob/useMouseMove';

const TestComponent = ({ mockFn = jest.fn(), isDragging = true }) => {
  useMouseMove({
    isDragging,
    isFixedRange: false,
    fixedPositions: [],
    minLimit: 0,
    maxLimit: 100,
    objectRef: { current: document.createElement('div') },
    parentLeft: 100,
    stopDragging: jest.fn(),
    updateKnobPosition: mockFn,
  });

  return <div>Test Component</div>;
};
const TestFixedRangeComponent = ({ mockFn = jest.fn(), isDragging = true }) => {
  useMouseMove({
    isDragging,
    isFixedRange: true,
    fixedPositions: [0, 50, 100],
    minLimit: 0,
    maxLimit: 100,
    objectRef: { current: document.createElement('div') },
    parentLeft: 100,
    stopDragging: jest.fn(),
    updateKnobPosition: mockFn,
  });

  return <div>Test Component</div>;
};

describe('GIVEN useMouseMove hook', () => {
  describe('WHEN the component mounts', () => {
    it('THEN it should add event listeners for mouse events', () => {
      const addEventListenerMock = jest.spyOn(document, 'addEventListener');

      render(<TestComponent />);

      expect(addEventListenerMock).toHaveBeenCalledWith(
        'mousemove',
        expect.any(Function),
      );
      expect(addEventListenerMock).toHaveBeenCalledWith(
        'mouseup',
        expect.any(Function),
      );
    });
  });

  describe('WHEN the user moves the mouse while dragging', () => {
    test('THEN it should update object ref position', () => {
      const parentElementLeft = 100;
      const newPositionX = 120;
      const mockUpdateKnobPosition = jest.fn();

      render(<TestComponent mockFn={mockUpdateKnobPosition} />);
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: newPositionX,
      });
      document.dispatchEvent(mouseMoveEvent);

      expect(mockUpdateKnobPosition).toHaveBeenCalledWith(
        newPositionX - parentElementLeft,
      );
    });
    test('THEN it should not update position if movement is not close to next value', () => {
      const firstRangeValue = 0;
      const newPositionX = 120;
      const mockUpdateKnobPosition = jest.fn();

      render(<TestFixedRangeComponent mockFn={mockUpdateKnobPosition} />);
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: newPositionX,
      });
      document.dispatchEvent(mouseMoveEvent);

      expect(mockUpdateKnobPosition).toHaveBeenCalledWith(firstRangeValue);
    });
    test('THEN it should update position if movement is close to next value', () => {
      const closestRangeValue = 50;
      const newPositionX = 160;
      const mockUpdateKnobPosition = jest.fn();

      render(<TestFixedRangeComponent mockFn={mockUpdateKnobPosition} />);
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: newPositionX,
      });
      document.dispatchEvent(mouseMoveEvent);

      expect(mockUpdateKnobPosition).toHaveBeenCalledWith(closestRangeValue);
    });
  });
  describe('WHEN the user moves the mouse but it is not dragging', () => {
    test('THEN it should NOT update object ref position', () => {
      const newPositionX = 120;
      const mockUpdateKnobPosition = jest.fn();

      render(
        <TestComponent mockFn={mockUpdateKnobPosition} isDragging={false} />,
      );
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: newPositionX,
      });
      document.dispatchEvent(mouseMoveEvent);

      expect(mockUpdateKnobPosition).not.toHaveBeenCalled();
    });
  });

  describe('WHEN the component unmounts', () => {
    it('THEN itshould remove event listeners', () => {
      const removeEventListenerMock = jest.spyOn(
        document,
        'removeEventListener',
      );

      const { unmount } = render(<TestComponent />);
      act(() => {
        unmount();
      });

      expect(removeEventListenerMock).toHaveBeenCalledTimes(2);
      expect(removeEventListenerMock).toHaveBeenCalledWith(
        'mousemove',
        expect.any(Function),
      );
      expect(removeEventListenerMock).toHaveBeenCalledWith(
        'mouseup',
        expect.any(Function),
      );
    });
  });
});
