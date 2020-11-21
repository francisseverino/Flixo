import React from 'react';
import { shallow } from 'enzyme';
//   import { render, screen } from '@testing-library/react';
import Home from './Home';

// test('renders learn react link', () => {
//   render(<Home />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('Tets Home page', () => {
  it('renders without crashing', () => {
    shallow(<Home />);
  });
});
