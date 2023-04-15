import { findByRole, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
//import Fetch from './fetch' //-The url to get
import Home from './home';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

//UNIT TESTS Check Rendering
test('testing app home heading', () => {
  render(<BrowserRouter><Home /></BrowserRouter>);
  const headerElement = screen.getByText(/Kauri Point Construction Services/i);
  expect(headerElement).toBeInTheDocument();
})

test('testing New builds section appears on home', () => {
  render(<BrowserRouter><Home /></BrowserRouter>);
  const newBuildsSection = screen.getByText(/New builds/i);
  expect(newBuildsSection).toBeInTheDocument();
})
