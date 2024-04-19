import { render, screen } from '@testing-library/react';
import App from './App';
import Login from './pages/Login';

test('renders learn react link', () => {
  // render(<Login />);
  render(<App />);
   
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
