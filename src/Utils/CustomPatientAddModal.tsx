import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@mui/material';
import FormikControl from '../CustomComponent/FormikControl';
import { PostPatientInfo } from '../Redux/PatientSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { PatientModel } from '../TypeFile/TypeScriptType';
import { IoIosClose } from 'react-icons/io';
import './CustomPatientDelete.scss';
interface CountryOption {
  id: string;
  key: string;
  data: string;
}

const initial = {
  patientName: '',
  email: '',
  address: '',
  phoneNumber: '',
  country: '',
  dob: '',
  ageField: 0,
  admitDate: '',
  patientImage: ''
};
const signinSchema = Yup.object().shape({
  email: Yup.string().email().required('Enter valid email-id'),
  patientName: Yup.string().required('name is required'),
  address: Yup.string().required('address is required'),
  phoneNumber: Yup.string().required('phone number is required'),
  country: Yup.string().required('country is required'),
  dob: Yup.string().required('Dob is required'),
  ageField: Yup.number().required('number is required'),
  admitDate: Yup.string().required('admitDate is required'),
  patientImage: Yup.mixed().required('File is required')
});

const CountryOptions: CountryOption[] = [
  { id: '1', key: 'Tamilnadu', data: 'Tamilnadu' },
  { id: '2', key: 'Kolkata', data: 'Kolkata' },
  { id: '3', key: 'Kerala', data: 'Kerala' }
];

const CustomPatientAddModal: React.FC<{ id: string }> = ({ id }) => {
  const [image, setImg] = useState<string | ArrayBuffer | null>('');
  const [checkError, setCheckError] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (data: PatientModel) => {
    const formdata: any = new FormData();
    formdata.append('patientImage', data?.patientImage);
    formdata.append('dob', data?.dob);
    formdata.append('country', data?.country);
    formdata.append('address', data?.address);
    formdata.append('admitDate', data?.admitDate);
    formdata.append('phoneNumber', data?.phoneNumber);
    formdata.append('email', data?.email);
    formdata.append('ageField', data?.ageField);
    formdata.append('patientName', data?.patientName);
    setCheckError(true);
    dispatch(PostPatientInfo(formdata));
  };
  return (
    <div className="modal fade" id={id} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-md modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add Patient
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
                    <Grid container>
                      <Grid item xs={12}>
                        <FormikControl
                          control="upload"
                          type="file"
                          name="patientImage"
                          onChange={(event: any) => {
                            formik.setFieldValue('patientImage', event.target.files[0]);
                            const reader = new FileReader();
                            reader.onload = () => {
                              setImg(reader?.result);
                            };
                            if (event.target.files[0]) {
                              reader.readAsDataURL(event.target.files[0]);
                            }
                          }}
                          error={formik.errors.patientImage}
                          imgData={image}
                          test="test1"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          type="text"
                          label="Name"
                          name="patientName"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.patientName && Boolean(formik.errors.patientName)}
                          helperText={formik.touched.patientName && formik.errors.patientName}
                          test="err1"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          type="email"
                          label="Email"
                          name="email"
                          onChange={formik.handleChange}
                          error={formik.touched.email && Boolean(formik.errors.email)}
                          helperText={formik.touched.email && formik.errors.email}
                          test="err2"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          type="text"
                          label="Address"
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
                          label="PhoneNumber"
                          name="phoneNumber"
                          onChange={formik.handleChange}
                          error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                          test="err4"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="select"
                          label="Country"
                          name="country"
                          options={CountryOptions}
                          onChange={formik.handleChange}
                          error={formik.touched.country && Boolean(formik.errors.country)}
                          helperText={formik.touched.country && formik.errors.country}
                          test="err5"
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          label="Dob"
                          name="dob"
                          type="date"
                          onChange={formik.handleChange}
                          error={formik.touched.dob && Boolean(formik.errors.dob)}
                          helperText={formik.touched.dob && formik.errors.dob}
                          test="err6"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          label="Age"
                          name="ageField"
                          type="number"
                          onChange={formik.handleChange}
                          error={formik.touched.ageField && Boolean(formik.errors.ageField)}
                          helperText={formik.touched.ageField && formik.errors.ageField}
                          test="err7"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          label="AdmitDate"
                          name="admitDate"
                          type="date"
                          onChange={formik.handleChange}
                          error={formik.touched.admitDate && Boolean(formik.errors.admitDate)}
                          helperText={formik.touched.admitDate && formik.errors.admitDate}
                          test="err8"
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className="d-flex align-items-center justify-content-center gap-3 mt-4">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                      Cancel
                    </button>
                    <button
                      className="btn btn-secondary"
                      type="submit"
                      data-bs-dismiss={`${checkError ? 'modal' : ''}`}
                      aria-label="Close">
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
export default CustomPatientAddModal;
