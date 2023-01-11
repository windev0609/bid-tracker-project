import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, TextField, Checkbox, FormControlLabel, FormControl } from '@mui/material';
import FormikControl from '../CustomComponent/FormikControl';
import { PostDoctorInfo } from '../Redux/DoctorSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { IoIosClose } from 'react-icons/io';
import './CustomPatientDelete.scss';

import * as mui from '@mui/material';
import * as antd from 'antd';
import axios from 'axios';

interface CountryOption {
  id: string;
  key: string;
  data: string;
}
interface SpecialistDoctor {
  id: string;
  key: string;
  data: string;
}
interface DoctorInfo {
  yourName: string;
  email: string;
  doctorName: string;
  address: string;
  phoneNumber: string;
  dob: string;
  specialist: string;
  country: string;
  doctorImage: string;
  clientPV: string;
  clientIV: string;
  bid: string;
  chat: string;
}
const signinSchema = Yup.object().shape({
  email: Yup.string().email().required('Enter valid email-id'),
  yourName: Yup.string().required('Yourname is required'),
  doctorName: Yup.string().required('Clinetname is required'),
  address: Yup.string().required('address is required'),
  phoneNumber: Yup.string().required('phone number is required'),
  country: Yup.string().required('country is required'),
  specialist: Yup.string().required('speciality is required'),
  dob: Yup.string().required('Dob is required'),
  doctorImage: Yup.mixed().required('File is required'),
  clientPV: Yup.mixed().required('ClientPaymentVeryfy is required')
});

const initial = {
  yourName: '',
  email: '',
  doctorName: '',
  address: '',
  phoneNumber: '',
  specialist: '',
  country: '',
  dob: '',
  doctorImage: '',
  clientPV: '',
  clientIV: '',
  bid: '',
  chat: ''
};

const CountryOptions: CountryOption[] = [
  { id: '1', key: 'Tamilnadu', data: 'Tamilnadu' },
  { id: '2', key: 'Kolkata', data: 'Kolkata' },
  { id: '3', key: 'Kerala', data: 'Kerala' }
];

const specialistData: SpecialistDoctor[] = [
  { id: '1', key: 'Dentist', data: 'Dentist' },
  { id: '2', key: 'Gaselogist', data: 'Gaselogist' },
  { id: '3', key: 'Neuro', data: 'Neuro' }
];

const CustomAddModal: React.FC<{ id: string }> = ({ id }) => {
  const [checkError, setCheckError] = useState<boolean>(false);
  const [image, setImg] = useState<string | ArrayBuffer | null>('');
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (data: DoctorInfo) => {
    console.log('BidsData', data);
    const formData: any = new FormData();
    formData.append('yourName', data?.yourName);
    formData.append('doctorName', data?.doctorName);
    formData.append('email', data?.email);
    formData.append('phoneNumber', data?.phoneNumber);
    formData.append('address', data?.address);
    formData.append('specialist', data?.specialist);
    formData.append('country', data?.country);
    formData.append('doctorImage', data?.doctorImage);
    formData.append('dob', data?.dob);
    formData.append('clientPV', data?.clientPV);
    formData.append('clientIV', data?.clientIV);
    formData.append('bid', data?.bid);
    formData.append('chat', data?.chat);
    // formData.appent('clientIV', data?.clientIV);
    setCheckError(!checkError);
    dispatch(PostDoctorInfo(formData));
  };
  return (
    <div className="modal fade" id={id} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-md modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add Bid
            </h5>
            <IoIosClose data-bs-dismiss="modal" aria-label="Close" className="icons" />
          </div>
          <div className="modal-body p-3">
            <Formik
              initialValues={initial}
              onSubmit={(data) => handleSubmit(data)}
              validationSchema={signinSchema}>
              {(formik) => (
                <Form onSubmit={formik.handleSubmit}>
                  <div>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          type="text"
                          label="YourName"
                          name="yourName"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.yourName && Boolean(formik.errors.yourName)}
                          helperText={formik.touched.yourName && formik.errors.yourName}
                          test="err1"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          type="text"
                          label="ClinetName"
                          name="doctorName"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.doctorName && Boolean(formik.errors.doctorName)}
                          helperText={formik.touched.doctorName && formik.errors.doctorName}
                          test="err1"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          type="text"
                          label="ClientCountry"
                          name="address"
                          onChange={formik.handleChange}
                          error={formik.touched.address && Boolean(formik.errors.address)}
                          helperText={formik.touched.address && formik.errors.address}
                          test="err3"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          type="text"
                          label="ClientPayPrice"
                          name="phoneNumber"
                          onChange={formik.handleChange}
                          error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                          test="err4"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          label="WhenClientJoin"
                          name="dob"
                          type="date"
                          onChange={formik.handleChange}
                          error={formik.touched.dob && Boolean(formik.errors.dob)}
                          helperText={formik.touched.dob && formik.errors.dob}
                          test="err7"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          label="WhenJobJoin"
                          name="dob"
                          type="date"
                          onChange={formik.handleChange}
                          error={formik.touched.dob && Boolean(formik.errors.dob)}
                          helperText={formik.touched.dob && formik.errors.dob}
                          test="err7"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          type="text"
                          label="BidCount"
                          name="phoneNumber"
                          onChange={formik.handleChange}
                          error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                          test="err4"
                        />
                      </Grid>
                      <Grid item xs={6}></Grid>
                      <Grid item xs={6}>
                        <FormControl
                          // name="clientPV"
                          required
                          error={formik.touched.clientPV && Boolean(formik.errors.clientPV)}
                          // helperText={formik.touched.dob && formik.errors.dob}
                          // helperText={formik.touched.clientPV && formik.errors.clientPV}
                          // test="err7"
                        >
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="ClientPaymentVerify"
                            style={{ float: 'left' }}
                            onChange={formik.handleChange}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label="ClientIdVerify"
                          style={{ float: 'left' }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <mui.FormControl fullWidth sx={{ m: 1 }} variant="filled">
                          <mui.InputLabel htmlFor="filled-adornment-amount">Bid</mui.InputLabel>
                          <mui.FilledInput id="filled-adornment-bid" rows={4} multiline />
                        </mui.FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <mui.FormControl fullWidth sx={{ m: 1 }} variant="filled">
                          <mui.InputLabel htmlFor="filled-adornment-amount">Chat</mui.InputLabel>
                          <mui.FilledInput id="filled-adornment-chat" rows={4} multiline />
                        </mui.FormControl>
                      </Grid>
                    </Grid>
                    <div></div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center gap-3 mt-4">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-secondary"
                      data-bs-dismiss={`${checkError ? 'modal' : ''}`}
                      aria-label="Close"
                      onClick={() => console.log('clicked--------------------------------->')}>
                      save
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomAddModal;
