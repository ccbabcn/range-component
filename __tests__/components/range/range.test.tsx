import Range from '@/components/range/range';
import { PriceList } from '@/types/common';
import { render } from '@testing-library/react';

describe('GIVEN a Range component ', () => {
  describe('WHEN instantiated', () => {
    it('THEN it should render all the childrencomponents', () => {
      const prices: PriceList = [10, 100];
      const { getByTestId } = render(<Range prices={prices} />);
      const leftInput = getByTestId('left-input');
      const rightInput = getByTestId('right-input');
      const slider = getByTestId('slider');

      expect(leftInput).toBeInTheDocument();
      expect(rightInput).toBeInTheDocument();
      expect(slider).toBeInTheDocument();
    });
  });

  describe('WHEN it is rendered with a list of prices', () => {
    it('THEN it should show the min and max values', () => {
      const prices: PriceList = [100, 100];
      const expectedMinValue = String(prices[0]);

      const { getAllByDisplayValue } = render(<Range prices={prices} />);
      const inputValues = getAllByDisplayValue(expectedMinValue);

      expect(inputValues).toHaveLength(2);
    });
  });
});
