import SignupPage from './SignupPage';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import UserProvider from '../../Context/userContext';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('to test signup page', () => {
  test('render signup for text', () => {
    render(
      <Provider store={store}>
        <Router>
          <UserProvider>
            <SignupPage />
          </UserProvider>
        </Router>
      </Provider>
    );
    const text = screen.getByText(/^Create Account$/);
    expect(text).toBeInTheDocument();
  });

  test('check all input fields render', () => {
    render(
      <Provider store={store}>
        <Router>
          <UserProvider>
            <SignupPage />
          </UserProvider>
        </Router>
      </Provider>
    );
    const emailText = screen.getByTestId('email', { exact: false });
    expect(emailText).toBeInTheDocument();
    const nameText = screen.getByTestId('username', { exact: false });
    expect(nameText).toBeInTheDocument();
    const pwdText = screen.getByTestId('password', { exact: false });
    expect(pwdText).toBeInTheDocument();
    const role = screen.getByTestId('role', { exact: false });
    expect(role).toBeInTheDocument();
  });
  test('render the sugnup button', () => {
    render(
      <Provider store={store}>
        <Router>
          <UserProvider>
            <SignupPage />
          </UserProvider>
        </Router>
      </Provider>
    );
    const btn = screen.getByText('Sign up', { exact: false });
    expect(btn).toBeInTheDocument();
  });
  test('check error message values box render', () => {
    render(
      <Provider store={store}>
        <Router>
          <UserProvider>
            <SignupPage />
          </UserProvider>
        </Router>
      </Provider>
    );
    const emailRequired = screen.getByTestId('error-test1');
    expect(emailRequired).toBeInTheDocument();
    const nameRequired = screen.getByTestId('error-test2');
    expect(nameRequired).toBeInTheDocument();
    const pwdRequired = screen.getByTestId('error-test3');
    expect(pwdRequired).toBeInTheDocument();
    const roleRequired = screen.getByTestId('error-test4');
    expect(roleRequired).toBeInTheDocument();
  });

  test('check all error messages show when hit submut button in empty stage', async () => {
    render(
      <Provider store={store}>
        <Router>
          <UserProvider>
            <SignupPage />
          </UserProvider>
        </Router>
      </Provider>
    );
    const emailField = screen.getByTestId('email');
    fireEvent.change(emailField, { target: { value: '' } });
    const nameField = screen.getByTestId('username');
    fireEvent.change(nameField, { target: { value: '' } });
    const userField = screen.getByTestId('password');
    fireEvent.change(userField, { target: { value: '' } });
    const roleField = screen.getByTestId('role');
    fireEvent.change(roleField, { target: { value: '' } });
    const btn = screen.getByText('Sign up', { exact: false });
    userEvent.click(btn);

    await waitFor(() => {
      const emailRequired = screen.getByTestId('error-test1');
      expect(emailRequired).toHaveTextContent('Enter valid email-id');
    });

    await waitFor(() => {
      const nameRequired = screen.getByTestId('error-test2');
      expect(nameRequired).toHaveTextContent('Please enter user name');
    });
    await waitFor(() => {
      const pwdRequired = screen.getByTestId('error-test3');
      expect(pwdRequired).toHaveTextContent('Password is required');
    });
    await waitFor(() => {
      const roleRequired = screen.getByTestId('error-test4');
      expect(roleRequired).toHaveTextContent('Please enter role');
    });
  });
  test('check correct email is displayed show error message', async () => {
    render(
      <Provider store={store}>
        <Router>
          <UserProvider>
            <SignupPage />
          </UserProvider>
        </Router>
      </Provider>
    );
    const emailText = screen.getByTestId('email');
    fireEvent.change(emailText, { target: { value: 'cmmaran' } });
    fireEvent.change(emailText, { target: { value: 'cmmaran102@.co' } });
    fireEvent.change(emailText, { target: { value: 'cmmaran102.com' } });
    const btn = screen.getByText('Sign up', { exact: false });
    userEvent.click(btn);
    await waitFor(() => {
      const emailRequired = screen.getByTestId('error-test1');
      expect(emailRequired).toHaveTextContent('email must be a valid email');
    });
  });
  test('check correct password Must Contain 8 Characters, One Uppercase', async () => {
    render(
      <Provider store={store}>
        <Router>
          <UserProvider>
            <SignupPage />
          </UserProvider>
        </Router>
      </Provider>
    );
    const pwdText = screen.getByTestId('password');
    fireEvent.change(pwdText, { target: { value: 'cmmaran' } });
    const btn = screen.getByText('Sign up', { exact: false });
    userEvent.click(btn);
    await waitFor(() => {
      const pwdRequired = screen.getByTestId('error-test3');
      expect(pwdRequired).toHaveTextContent(
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      );
    });
  });
});
