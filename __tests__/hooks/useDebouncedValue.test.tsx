import { render, waitFor } from '@testing-library/react';
import useDebouncedValue from '@/hooks/useDebouncedValue';

const TestComponent = ({ value, delay }) => {
  const debouncedValue = useDebouncedValue({ value, delay });

  return <div>{debouncedValue}</div>;
};

describe('GIVEN useDebouncedValue hook', () => {
  describe('WHEN used in a component', () => {
    it('THEN it should return the initial value', async () => {
      const expectedValue = 'initial';

      const { getByText } = render(
        <TestComponent value={expectedValue} delay={100} />,
      );

      await waitFor(() => expect(getByText(expectedValue)).toBeInTheDocument());
    });
  });
});
