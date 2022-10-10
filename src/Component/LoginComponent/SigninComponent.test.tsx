import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import UserProvider from '../../Context/userContext';
import userEvent from '@testing-library/user-event';
import SigninComponent from './SigninComponent';
import { BrowserRouter as Router } from 'react-router-dom';
describe('to test Sign in page', () => {
  test('signin component render checker', () => {
    render(
      <Provider store={store}>
        <Router>
          <UserProvider>
            <SigninComponent />
          </UserProvider>
        </Router>
      </Provider>
    );
    const text = screen.getByText('Signin Account', { exact: false });
    expect(text).toBeInTheDocument();
  });

  test('check all input fields render in login component', () => {
    render(
      <Provider store={store}>
        <Router>
          <UserProvider>
            <SigninComponent />
          </UserProvider>
        </Router>
      </Provider>
    );
    const emailText = screen.getByTestId('email', { exact: false });
    expect(emailText).toBeInTheDocument();
    const pwdText = screen.getByTestId('password', { exact: false });
    expect(pwdText).toBeInTheDocument();
  });
  test('render the singin button', () => {
    render(
      <Provider store={store}>
        <Router>
          <UserProvider>
            <SigninComponent />
          </UserProvider>
        </Router>
      </Provider>
    );
    const btn = screen.getByText('Sign in', { exact: false });
    expect(btn).toBeInTheDocument();
  });
  test('check error email password render checker', () => {
    render(
      <Provider store={store}>
        <Router>
          <UserProvider>
            <SigninComponent />
          </UserProvider>
        </Router>
      </Provider>
    );
    const emailRequired = screen.getByTestId('error-test1');
    expect(emailRequired).toBeInTheDocument();
    const passRequired = screen.getByTestId('error-test2');
    expect(passRequired).toBeInTheDocument();
  });

  test('check empty field show error message in signin componenet', async () => {
    render(
      <Provider store={store}>
        <Router>
          <UserProvider>
            <SigninComponent />
          </UserProvider>
        </Router>
      </Provider>
    );
    const emailField = screen.getByTestId('email');
    fireEvent.change(emailField, { target: { value: '' } });
    const passField = screen.getByTestId('password');
    fireEvent.change(passField, { target: { value: '' } });
    const btn = screen.getByText('Sign in', { exact: false });
    userEvent.click(btn);

    await waitFor(() => {
      const emailRequired = screen.getByTestId('error-test1');
      expect(emailRequired).toHaveTextContent('Enter valid email-id');
    });

    await waitFor(() => {
      const passRequired = screen.getByTestId('error-test2');
      expect(passRequired).toHaveTextContent('Password is required');
    });
  });
  test('click the signup button to test', () => {
    render(
      <Provider store={store}>
        <Router>
          <UserProvider>
            <SigninComponent />
          </UserProvider>
        </Router>
      </Provider>
    );
    const btn = screen.getByText('Signup', { exact: false });
    userEvent.click(btn);
  });
  test('check correct email is displayed show error message in signin component', async () => {
    render(
      <Provider store={store}>
        <Router>
          <UserProvider>
            <SigninComponent />
          </UserProvider>
        </Router>
      </Provider>
    );
    const emailText = screen.getByTestId('email');
    fireEvent.change(emailText, { target: { value: 'cmmaran' } });
    fireEvent.change(emailText, { target: { value: 'cmmaran102@.co' } });
    fireEvent.change(emailText, { target: { value: 'cmmaran102.com' } });
    const btn = screen.getByText('Sign in', { exact: false });
    userEvent.click(btn);
    await waitFor(() => {
      const emailRequired = screen.getByTestId('error-test1');
      expect(emailRequired).toHaveTextContent('email must be a valid email');
    });
  });
  test('check correct password Must Contain 8 Characters, One Uppercase in signin', async () => {
    render(
      <Provider store={store}>
        <Router>
          <UserProvider>
            <SigninComponent />
          </UserProvider>
        </Router>
      </Provider>
    );
    const pwdText = screen.getByTestId('password');
    fireEvent.change(pwdText, { target: { value: 'cmmaran' } });
    const btn = screen.getByText('Sign in', { exact: false });
    userEvent.click(btn);
    await waitFor(() => {
      const pwdRequired = screen.getByTestId('error-test2');
      expect(pwdRequired).toHaveTextContent(
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      );
    });
  });
});
