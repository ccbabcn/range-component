import { render, screen, fireEvent } from '@testing-library/react';
import Input from '@/components/range/input/input';

describe('Given an Input component', () => {
  describe('WHEN it is instantiated', () => {
    it('THEN it should render the component with the initial values', () => {
      const expectedValue = 10;
      render(
        <Input
          value={10}
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          onUpdate={() => {}}
        />,
      );
      const input = screen.getByPlaceholderText('10');

      expect(input).toHaveValue(expectedValue);
    });
    it('THEN it should update input value when user types', () => {
      const expectedValue = 20;
      render(
        <Input
          value={10}
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          onUpdate={() => {}}
        />,
      );

      const input = screen.getByPlaceholderText('10');
      fireEvent.change(input, { target: { value: '20' } });

      expect(input).toHaveValue(expectedValue);
    });

    it('THEN it should call onUpdate with correct values when input value changes', () => {
      const mockHandleUpdate = jest.fn();
      render(
        <Input
          value={10}
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          onUpdate={mockHandleUpdate}
        />,
      );
      const input = screen.getByPlaceholderText('10');
      fireEvent.change(input);
      expect(mockHandleUpdate).toHaveBeenCalled();
    });
  });
});
