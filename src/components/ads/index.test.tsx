import { render } from '@testing-library/react';

import React from 'react';
import Ads from './index';
 
test('renders ads by snapshot', () => {
  const { container } = render(<Ads />);
  expect(container).toMatchSnapshot();
});