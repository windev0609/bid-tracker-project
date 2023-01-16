import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import UserProvider from '../../Context/userContext';
import userEvent from '@testing-library/user-event';
import AllDoctor from '../Doctors/AllDoctor';
import CustomAddModal from '../../Utils/CustomAddModal';
import CustomDoctorEdit from '../../Utils/CustomDoctorEdit';
import CustomDoctorDelete from '../../Utils/CustomDoctorDelete';

const handleClose = jest.fn();
const [showModal, setShowModal] = React.useState(false);
const handleCloseModal = () => setShowModal(false);

const InputCheckRender = () => {
  const nameText = screen.getByTestId('doctorName', { exact: false });
  expect(nameText).toBeInTheDocument();
  const emailText = screen.getByTestId('email', { exact: false });
  expect(emailText).toBeInTheDocument();
  const addressText = screen.getByTestId('address', { exact: false });
  expect(addressText).toBeInTheDocument();
  const phoneText = screen.getByTestId('phoneNumber', { exact: false });
  expect(phoneText).toBeInTheDocument();
  const countryText = screen.getByTestId('country', { exact: false });
  expect(countryText).toBeInTheDocument();
  const dobText = screen.getByTestId('dob', { exact: false });
  expect(dobText).toBeInTheDocument();
  const specialistText = screen.getByTestId('specialist', { exact: false });
  expect(specialistText).toBeInTheDocument();
};
const checkErrorFieldRender = () => {
  const nameRequired = screen.getByTestId('err1');
  expect(nameRequired).toBeInTheDocument();
  const emailRequired = screen.getByTestId('err2');
  expect(emailRequired).toBeInTheDocument();
  const addressRequired = screen.getByTestId('err3');
  expect(addressRequired).toBeInTheDocument();
  const phoneNumber = screen.getByTestId('err4');
  expect(phoneNumber).toBeInTheDocument();
  const countryRequired = screen.getByTestId('err5');
  expect(countryRequired).toBeInTheDocument();
  const specialistRequired = screen.getByTestId('err6');
  expect(specialistRequired).toBeInTheDocument();
  const dobRequired = screen.getByTestId('err7');
  expect(dobRequired).toBeInTheDocument();
};
const checkRenderCancelButton = () => {
  const btn = screen.getByText('save', { exact: false });
  expect(btn).toBeInTheDocument();
  const cancelbtn = screen.getByText('cancel', { exact: false });
  expect(cancelbtn).toBeInTheDocument();
};

describe('render doctor page screen', () => {
  test('check doctor page render', () => {
    render(
      <Provider store={store}>
        <UserProvider>
          <AllDoctor />
        </UserProvider>
      </Provider>
    );
  });
  test('check doctor add modal', () => {
    render(
      <Provider store={store}>
        <UserProvider>
          <CustomAddModal id="exampleModal" open={showModal} close={handleCloseModal} />
        </UserProvider>
      </Provider>
    );
    const text = screen.getByText('Add Doctor', { exact: false });
    expect(text).toBeInTheDocument();
  });
  test('check all input fields render in add modal', () => {
    render(
      <Provider store={store}>
        <UserProvider>
          <CustomAddModal id="exampleModal" open={showModal} close={handleCloseModal} />
        </UserProvider>
      </Provider>
    );
    InputCheckRender();
  });
  test('render the cancel save  button in add doctor modal', () => {
    render(
      <Provider store={store}>
        <UserProvider>
          <CustomAddModal id="exampleModal" open={showModal} close={handleCloseModal} />
        </UserProvider>
      </Provider>
    );
    checkRenderCancelButton();
  });
  test('check error message values box render in add doctor', () => {
    render(
      <Provider store={store}>
        <UserProvider>
          <CustomAddModal id="exampleModal" open={showModal} close={handleCloseModal} />
        </UserProvider>
      </Provider>
    );
    checkErrorFieldRender();
  });
  test('check error message when hit submit button in add doctor', async () => {
    render(
      <Provider store={store}>
        <UserProvider>
          <CustomAddModal id="exampleModal" open={showModal} close={handleCloseModal} />
        </UserProvider>
      </Provider>
    );
    const nameText = screen.getByTestId('doctorName', { exact: false });
    fireEvent.change(nameText, { target: { value: '' } });
    const emailText = screen.getByTestId('email');
    fireEvent.change(emailText, { target: { value: '' } });
    const addressText = screen.getByTestId('address');
    fireEvent.change(addressText, { target: { value: '' } });
    const phoneText = screen.getByTestId('phoneNumber');
    fireEvent.change(phoneText, { target: { value: '' } });
    const countryText = screen.getByTestId('country');
    fireEvent.change(countryText, { target: { value: '' } });
    const dobText = screen.getByTestId('dob');
    fireEvent.change(dobText, { target: { value: '' } });
    const specialistText = screen.getByTestId('specialist');
    fireEvent.change(specialistText, { target: { value: '' } });
    const btn = screen.getByText('save', { exact: false });
    userEvent.click(btn);
    await waitFor(() => {
      const nameRequired = screen.getByTestId('err1');
      expect(nameRequired).toHaveTextContent('name is required');
    });
    await waitFor(() => {
      const emailRequired = screen.getByTestId('err2');
      expect(emailRequired).toHaveTextContent('Enter valid email-id');
    });
    await waitFor(() => {
      const addressRequired = screen.getByTestId('err3');
      expect(addressRequired).toHaveTextContent('address is required');
    });
    await waitFor(() => {
      const phoneNumber = screen.getByTestId('err4');
      expect(phoneNumber).toHaveTextContent('phone number is required');
    });
    await waitFor(() => {
      const countryRequired = screen.getByTestId('err5');
      expect(countryRequired).toHaveTextContent('country is required');
    });
    await waitFor(() => {
      const specialistRequired = screen.getByTestId('err6');
      expect(specialistRequired).toHaveTextContent('speciality is required');
    });
    await waitFor(() => {
      const dobRequired = screen.getByTestId('err7');
      expect(dobRequired).toHaveTextContent('Dob is required');
    });
  });
});

describe('render edit modal screen', () => {
  test('render check edit render', () => {
    render(
      <Provider store={store}>
        <UserProvider>
          <CustomDoctorEdit id={'exampleModalEdit'} />
        </UserProvider>
      </Provider>
    );
    const text = screen.getByText('Edit Doctor', { exact: false });
    expect(text).toBeInTheDocument();
  });
  test('check all input fields render in edit doctor modal', () => {
    render(
      <Provider store={store}>
        <UserProvider>
          <CustomDoctorEdit id={'exampleModalEdit'} />
        </UserProvider>
      </Provider>
    );
    const nameText = screen.getByTestId('doctorName', { exact: false });
    expect(nameText).toBeInTheDocument();
    const emailText = screen.getByTestId('email', { exact: false });
    expect(emailText).toBeInTheDocument();
    const addressText = screen.getByTestId('address', { exact: false });
    expect(addressText).toBeInTheDocument();
    const phoneText = screen.getByTestId('phoneNumber', { exact: false });
    expect(phoneText).toBeInTheDocument();
    const countryText = screen.getByTestId('country', { exact: false });
    expect(countryText).toBeInTheDocument();
    const dobText = screen.getByTestId('dob', { exact: false });
    expect(dobText).toBeInTheDocument();
    const specialistText = screen.getByTestId('specialist', { exact: false });
    expect(specialistText).toBeInTheDocument();
  });
  test('render the cancel save  button in edit doctor  modal', () => {
    render(
      <Provider store={store}>
        <UserProvider>
          <CustomDoctorEdit id={'exampleModalEdit'} />
        </UserProvider>
      </Provider>
    );
    checkRenderCancelButton();
  });
  test('check error message values box render in edit modal doctor', () => {
    render(
      <Provider store={store}>
        <UserProvider>
          <CustomDoctorEdit id={'exampleModalEdit'} />
        </UserProvider>
      </Provider>
    );
    const nameRequired = screen.getByTestId('err1');
    expect(nameRequired).toBeInTheDocument();
    const emailRequired = screen.getByTestId('err2');
    expect(emailRequired).toBeInTheDocument();
    const addressRequired = screen.getByTestId('err3');
    expect(addressRequired).toBeInTheDocument();
    const phoneNumber = screen.getByTestId('err4');
    expect(phoneNumber).toBeInTheDocument();
    const countryRequired = screen.getByTestId('err5');
    expect(countryRequired).toBeInTheDocument();
    const specialistRequired = screen.getByTestId('err6');
    expect(specialistRequired).toBeInTheDocument();
    const dobRequired = screen.getByTestId('err7');
    expect(dobRequired).toBeInTheDocument();
  });
  test('check error message when hit submit button in edit doctor', async () => {
    render(
      <Provider store={store}>
        <UserProvider>
          <CustomDoctorEdit id={'exampleModalEdit'} />
        </UserProvider>
      </Provider>
    );
    const nameText = screen.getByTestId('doctorName', { exact: false });
    fireEvent.change(nameText, { target: { value: '' } });
    const emailText = screen.getByTestId('email');
    fireEvent.change(emailText, { target: { value: '' } });
    const addressText = screen.getByTestId('address');
    fireEvent.change(addressText, { target: { value: '' } });
    const phoneText = screen.getByTestId('phoneNumber');
    fireEvent.change(phoneText, { target: { value: '' } });
    const countryText = screen.getByTestId('country');
    fireEvent.change(countryText, { target: { value: '' } });
    const dobText = screen.getByTestId('dob');
    fireEvent.change(dobText, { target: { value: '' } });
    const specialistText = screen.getByTestId('specialist');
    fireEvent.change(specialistText, { target: { value: '' } });
    const btn = screen.getByText('save', { exact: false });
    userEvent.click(btn);

    await waitFor(() => {
      const nameRequired = screen.getByTestId('err1');
      expect(nameRequired).toHaveTextContent('name is required');
    });
    await waitFor(() => {
      const emailRequired = screen.getByTestId('err2');
      expect(emailRequired).toHaveTextContent('Enter valid email-id');
    });
    await waitFor(() => {
      const addressRequired = screen.getByTestId('err3');
      expect(addressRequired).toHaveTextContent('address is required');
    });
    await waitFor(() => {
      const phoneNumber = screen.getByTestId('err4');
      expect(phoneNumber).toHaveTextContent('phone number is required');
    });
    await waitFor(() => {
      const countryRequired = screen.getByTestId('err5');
      expect(countryRequired).toHaveTextContent('country is required');
    });
    await waitFor(() => {
      const specialistRequired = screen.getByTestId('err6');
      expect(specialistRequired).toHaveTextContent('speciality is required');
    });
    await waitFor(() => {
      const dobRequired = screen.getByTestId('err7');
      expect(dobRequired).toHaveTextContent('Dob is required');
    });
  });
});

describe('render delete Modal screen for doctor edit', () => {
  test('check delete modal render in doctor screen', () => {
    render(
      <Provider store={store}>
        <UserProvider>
          <CustomDoctorDelete open={true} close={handleClose} edit={''} />
        </UserProvider>
      </Provider>
    );
    const text = screen.getByText('Do you want to delete a doctor?', { exact: false });
    expect(text).toBeInTheDocument();
  });

  test('check btn renders in delete doctor', () => {
    render(
      <Provider store={store}>
        <UserProvider>
          <CustomDoctorDelete open={true} close={handleClose} edit={''} />
        </UserProvider>
      </Provider>
    );
    const cancelbtn = screen.getByText('Cancel', { exact: false });
    expect(cancelbtn).toBeInTheDocument();
    const btn = screen.getByText('Yes', { exact: false });
    expect(btn).toBeInTheDocument();
  });
});
