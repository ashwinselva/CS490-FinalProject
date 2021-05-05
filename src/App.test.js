import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('login button disappears',()=>{
  render(<App />);
  const loginButtonElement= screen.getByText('Login');
  expect(loginButtonElement).toBeInTheDocument();
  fireEvent.click(loginButtonElement);
  expect(loginButtonElement).not.toBeInTheDocument();
});

test('new user button disappears',()=>{
  render(<App />);
  const userButtonElement= screen.getByText('New User');
  expect(userButtonElement).toBeInTheDocument();
  fireEvent.click(userButtonElement);
  expect(userButtonElement).not.toBeInTheDocument();
});


test('back to homepage button appears after clicking on view pools button',()=>{
  render(<App />);
  const viewPoolsButtonElement= screen.getByText('View Pools');

  expect(viewPoolsButtonElement).toBeInTheDocument();
  fireEvent.click(viewPoolsButtonElement);
  const backButtonElement= screen.getByText('Back To Homepage');

  expect(backButtonElement).toBeInTheDocument();
});



test('new search button doesnot disappear',()=>{
  render(<App />);
  const searchButtonElement= screen.getByText('Search');
  expect(searchButtonElement).toBeInTheDocument();
  fireEvent.click(searchButtonElement);
  expect(searchButtonElement).toBeInTheDocument();
});


