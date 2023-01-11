import React, { useState } from 'react';
import { Form, withFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { Grid } from '@mui/material';
import FormikControl from '../CustomComponent/FormikControl';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { UserContextType } from '../TypeFile/TypeScriptType';
import { userContext } from '../Context/userContext';
import { IoIosClose } from 'react-icons/io';
import './CustomPatientDelete.scss';
import { UpdateDoctorInfo } from '../Redux/DoctorSlice';

import { Formik } from 'formik';
import * as mui from '@mui/material';
import { TextField, Checkbox, FormControlLabel, FormControl } from '@mui/material';
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
  email: string;
  doctorName: string;
  address: string;
  phoneNumber: string;
  dob: string;
  specialist: string;
  country: string;
  yourName: string;
  doctorImage: string;
  clientPV: string;
  clientIV: string;
  bid: string;
  chat: string;
}
const initial = {
  email: '',
  doctorName: '',
  address: '',
  phoneNumber: '',
  dob: '',
  specialist: '',
  country: '',
  yourName: '',
  doctorImage: '',
  clientPV: '',
  clientIV: '',
  bid: '',
  chat: ''
};
const signinSchema = Yup.object().shape({
  email: Yup.string().email().required('Enter valid email-id'),
  doctorName: Yup.string().required('name is required'),
  address: Yup.string().required('address is required'),
  phoneNumber: Yup.string().required('phone number is required'),
  country: Yup.string().required('country is required'),
  specialist: Yup.string().required('speciality is required'),
  dob: Yup.string().required('Dob is required')
});

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

const CustomDoctorEdit: React.FC<{ id: string }> = ({ id }) => {
  const { EditedDoctor } = React.useContext(userContext) as UserContextType;
  const [checkError, setCheckError] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const convertToDate = (date: string) => {
    const format1 = 'YYYY-MM-DD';
    const date1 = new Date(date);

    const dateTime1 = moment(date1).format(format1);
    return dateTime1;
  };

  const InnerForm = (props: FormikProps<DoctorInfo>) => {
    const { values, touched, errors, handleBlur, handleChange } = props;
    return (
      <Form>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormikControl
                control="input"
                type="text"
                label="Name"
                name="doctorName"
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.doctorName && Boolean(errors.doctorName)}
                helperText={touched.doctorName && errors.doctorName}
                test="err1"
                value={values.doctorName}
              />
            </Grid>
            <Grid item xs={6}>
              <FormikControl
                control="input"
                type="email"
                label="Email"
                name="email"
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                test="err2"
                value={values.email}
              />
            </Grid>
            <Grid item xs={6}>
              <FormikControl
                control="input"
                type="text"
                label="Address"
                name="address"
                onChange={handleChange}
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
                test="err3"
                value={values.address}
              />
            </Grid>
            <Grid item xs={6}>
              <FormikControl
                control="input"
                type="text"
                label="PhoneNumber"
                name="phoneNumber"
                onChange={handleChange}
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
                test="err4"
                value={values.phoneNumber}
              />
            </Grid>
            <Grid item xs={6}>
              <FormikControl
                control="select"
                label="Country"
                name="country"
                options={CountryOptions}
                onChange={handleChange}
                error={touched.country && Boolean(errors.country)}
                helperText={touched.country && errors.country}
                test="err5"
                value={values.country}
              />
            </Grid>
            <Grid item xs={6}>
              <FormikControl
                control="select"
                label="Speciality"
                name="specialist"
                onChange={handleChange}
                options={specialistData}
                error={touched.specialist && Boolean(errors.specialist)}
                helperText={touched.specialist && errors.specialist}
                test="err6"
                value={values.specialist}
              />
            </Grid>
            <Grid item xs={6}>
              <FormikControl
                control="input"
                label="Dob"
                name="dob"
                type="date"
                onChange={handleChange}
                error={touched.dob && Boolean(errors.dob)}
                helperText={touched.dob && errors.dob}
                test="err7"
                value={values.dob}
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
            data-bs-dismiss={`${checkError ? 'modal' : ''}`}
            aria-label="Close">
            save
          </button>
        </div>
      </Form>
    );
  };
  const MyForm = withFormik({
    mapPropsToValues: () => {
      return {
        email: EditedDoctor?.email,
        doctorName: EditedDoctor?.doctorName,
        address: EditedDoctor?.address,
        phoneNumber: EditedDoctor?.phoneNumber,
        dob: convertToDate(EditedDoctor?.dob),
        specialist: EditedDoctor?.specialist,
        country: EditedDoctor?.country,
        yourName: EditedDoctor?.yourName,
        clientCountry: EditedDoctor?.clientCountry,
        clientPayPrice: EditedDoctor?.clientPayPrice,
        whenClientJoin: convertToDate(EditedDoctor?.whenClientJoin),
        whenJobJoin: convertToDate(EditedDoctor?.whenJobJoin),
        clientIV: EditedDoctor?.clientIV,
        bidCount: EditedDoctor?.bidCount,
        clientPV: EditedDoctor?.clientPV,
        bid: EditedDoctor?.bid,
        chat: EditedDoctor?.chat
      };
    },
    handleSubmit: (values) => {
      setCheckError(!checkError);
      dispatch(UpdateDoctorInfo(EditedDoctor?._id, values));
    },
    validationSchema: signinSchema
  })(InnerForm);

  return (
    <div
      className="modal fade"
      id={id}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false">
      <div className="modal-dialog modal-md modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Doctor
            </h5>
            <IoIosClose data-bs-dismiss="modal" aria-label="Close" className="icons" />
          </div>
          <div className="modal-body p-3">
            <MyForm />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomDoctorEdit;
