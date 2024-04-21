import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Page from '@/app/page';

describe('GIVEN a Page component', () => {
  describe('WHEN it is instantiated', () => {
    it('THEN it should render a heading and two paragraphs', () => {
      const { getByRole, getAllByRole } = render(<Page />);

      const heading = getByRole('heading', {
        level: 1,
        name: 'Custom Range Component',
      });

      const paragraphs = getAllByRole('paragraph');

      expect(heading).toBeInTheDocument();
      expect(paragraphs).toHaveLength(3);
    });
  });
});
