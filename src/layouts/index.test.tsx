import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';


import React from 'react';
import Layouts from './index';
 
test('renders layouts by snapshot', () => {
  const { container } = render(<Layouts />);
  expect(container).toMatchSnapshot();
});

 
test('renders layouts by testing-library', () => {
  const { container } = render(<Layouts />);
 
  const greetDom = screen.getByText('T&Cs apply' , {exact: false});
  expect(greetDom).toBeInTheDocument();
});