import { combineReducers } from '@reduxjs/toolkit';
import userSlices from './AuthenticationSlice';
import DoctorSlice from './DoctorSlice';
import PatientSlice from './PatientSlice';

const rootReducer = combineReducers({
  users: userSlices,
  Doctors: DoctorSlice,
  patient: PatientSlice
});

export default rootReducer;
