import { render, act, fireEvent } from '@testing-library/react';
import useTouchMove from '@/app/components/range/knob/useTouchMove';

const TestComponent = ({ mockFn = jest.fn(), isDragging = true }) => {
  useTouchMove({
    isDragging,
    objectRef: { current: document.createElement('div') },
    parentLeft: 100,
    minLimit: 0,
    maxLimit: 100,
    updateKnobPosition: mockFn,
    stopDragging: jest.fn(),
  });

  return <div>Test Component</div>;
};

describe('GIVEN useTouchMove hook', () => {
  describe('WHEN the component mounts', () => {
    it('THEN it should add event listeners for touch events', () => {
      const addEventListenerMock = jest.spyOn(document, 'addEventListener');

      render(<TestComponent />);

      expect(addEventListenerMock).toHaveBeenCalledWith(
        'touchmove',
        expect.any(Function),
      );
      expect(addEventListenerMock).toHaveBeenCalledWith(
        'touchend',
        expect.any(Function),
      );
    });
  });

  describe('WHEN the user moves the touch while dragging', () => {
    test('THEN it should update object ref position', () => {
      const parentElementLeft = 100;
      const newPositionX = 120;
      const mockUpdateKnobPosition = jest.fn();

      const screen = render(<TestComponent mockFn={mockUpdateKnobPosition} />);
      const element = screen.getByText('Test Component');

      fireEvent.touchMove(element, {
        touches: [{ clientX: newPositionX }],
      });

      expect(mockUpdateKnobPosition).toHaveBeenCalledWith(
        newPositionX - parentElementLeft,
      );
    });
  });
  describe('WHEN the user moves the touch but it is not dragging', () => {
    test('THEN it should NOT update object ref position', () => {
      const mockUpdateKnobPosition = jest.fn();
      const newPositionX = 120;

      const screen = render(
        <TestComponent mockFn={mockUpdateKnobPosition} isDragging={false} />,
      );
      const element = screen.getByText('Test Component');

      fireEvent.touchMove(element, {
        touches: [{ clientX: newPositionX }],
      });

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
        'touchmove',
        expect.any(Function),
      );
      expect(removeEventListenerMock).toHaveBeenCalledWith(
        'touchend',
        expect.any(Function),
      );
    });
  });
});
