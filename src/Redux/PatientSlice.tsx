import { createSlice } from '@reduxjs/toolkit';
import { Constants, ApiEndpoint } from '../Constants/Constant';
import Api from '../Constants/Instance';
import { AppDispatch } from '../store';
import { PatientModel } from '../TypeFile/TypeScriptType';
import { toast } from 'react-toastify';
interface PatientInfo {
  patientName: string;
  email: string;
  address: string;
  phoneNumber: string;
  country: string;
  dob: string;
  ageField: number;
  admitDate: string;
}
export const PostPatientInfo = (data: PatientModel) => {
  console.log(data);
  return async (dispatch: AppDispatch) => {
    try {
      const PatientInfoResponse = await Api({
        method: 'POST',
        url: Constants.BaseUrl + ApiEndpoint.PostPatientInfo,
        data
      }).then((res) => {
        toast.success('patient Suucessfully added');
        return res.data;
      });
      if (PatientInfoResponse) {
        dispatch(setPatientInfo(PatientInfoResponse));
        dispatch(GetPatientInfo());
      }
    } catch (err) {
      console.log(err);
    }
  };
};
export const GetPatientInfo = () => async (dispatch: AppDispatch) => {
  try {
    const GetPatientResponse = await Api({
      method: 'GET',
      url: Constants.BaseUrl + ApiEndpoint.GetPatientInfo
    }).then((res) => {
      return res?.data?.patient;
    });
    if (GetPatientResponse) {
      dispatch(getPatientResponse(GetPatientResponse));
    }
  } catch (err) {
    console.log(err);
  }
};
export const UpdatePatientInfo =
  (id: string, data: PatientInfo) => async (dispatch: AppDispatch) => {
    try {
      const UpdatePatientResponse = await Api({
        method: 'PATCH',
        url: Constants.BaseUrl + ApiEndpoint.UpdatePatientInfo + `/${id}`,
        data
      }).then((res) => {
        toast.success(res?.data?.message);
        return res?.data;
      });
      if (UpdatePatientResponse) {
        dispatch(updatePatientResponse(UpdatePatientResponse));
        dispatch(GetPatientInfo());
      }
    } catch (err) {
      console.log(err);
    }
  };
export const DeletePatientInfo = (data: string) => async (dispatch: AppDispatch) => {
  try {
    const DeletePatientResponse = await Api({
      method: 'DELETE',
      url: Constants.BaseUrl + ApiEndpoint.DeletePatientInfo + `/${data}`
    }).then((res) => {
      toast.success(res?.data?.message);
      return res?.data;
    });
    if (DeletePatientResponse) {
      dispatch(DeletePatientReducer(DeletePatientResponse));
      dispatch(GetPatientInfo());
    }
  } catch (err) {
    console.log(err);
  }
};
export const GetPatientById = (data: string) => async (dispatch: AppDispatch) => {
  try {
    const PatientResponse = await Api({
      method: 'PATCH',
      url: Constants.BaseUrl + ApiEndpoint.GetPatienById + `/${data}`
    }).then((res) => {
      return res?.data;
    });
    if (PatientResponse) {
      dispatch(GetOnePatient(PatientResponse));
    }
  } catch (err) {
    console.log(err);
  }
};
const initialState = {
  PatientInfoResponse: {
    data: {}
  },
  GetPatientResponse: {
    data: []
  },
  updatePatientResponse: {
    data: ''
  },
  DeletePatientResponse: {
    data: ''
  },
  GetOneResponse: {
    data: []
  }
};
const PatientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setPatientInfo: (state, action) => {
      state.PatientInfoResponse = {
        data: action.payload
      };
    },
    getPatientResponse: (state, action) => {
      state.GetPatientResponse = {
        data: action.payload
      };
    },

    updatePatientResponse: (state, action) => {
      state.updatePatientResponse = {
        data: action.payload
      };
    },
    DeletePatientReducer: (state, action) => {
      state.DeletePatientResponse = {
        data: action.payload
      };
    },
    GetOnePatient: (state, action) => {
      state.GetOneResponse = {
        data: action.payload
      };
    }
  }
});
const {
  setPatientInfo,
  getPatientResponse,
  updatePatientResponse,
  DeletePatientReducer,
  GetOnePatient
} = PatientSlice.actions;
export default PatientSlice.reducer;
