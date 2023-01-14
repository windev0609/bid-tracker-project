import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { Constants, ApiEndpoint } from '../Constants/Constant';
import Api from '../Constants/Instance';
import { AppDispatch } from '../store';
interface DoctorInfo {
  email: string;
  doctorName: string;
  address: string;
  phoneNumber: string;
  dob: string;
  specialist: string;
  country: string;
  yourName: string;
  clientCountry: string;
  clientPayPrice: string;
  whenClientJoin: string;
  whenJobJoin: string;
  bidCount: string;
  clientPV: string;
  clientIV: string;
  bid: string;
  chat: string;
}
export const PostDoctorInfo = (data: DoctorInfo) => {
  return async (dispatch: AppDispatch) => {
    try {
      const PostDoctorResponse = await Api({
        method: 'POST',
        url: Constants.BaseUrl + ApiEndpoint.PostDoctorInfo,
        data
      }).then((res) => {
        toast.success('successfult docter added');
        return res.data;
      });
      if (PostDoctorResponse) {
        dispatch(setPostInfo(PostDoctorResponse));
        dispatch(GetDoctorInfo());
      }
    } catch (err) {
      toast.error('error in api');
      console.log(err);
    }
  };
};
export const GetDoctorInfo = () => async (dispatch: AppDispatch) => {
  try {
    const GetDoctorResponse = await Api({
      method: 'GET',
      url: Constants.BaseUrl + ApiEndpoint.GetDoctorInfo
    }).then((res) => {
      console.log(res);
      return res?.data;
    });
    if (GetDoctorResponse) {
      dispatch(setDoctorInfo(GetDoctorResponse));
    }
  } catch (err) {
    console.log(err);
  }
};
export const UpdateDoctorInfo = (id: string, data: DoctorInfo) => async (dispatch: AppDispatch) => {
  try {
    const UpdateDoctorResponse = await Api({
      method: 'PATCH',
      url: Constants.BaseUrl + ApiEndpoint.UpdateDoctorInfo + `/${id}`,
      data
    }).then((res) => {
      toast.success(res?.data?.message);
      return res?.data;
    });
    if (UpdateDoctorResponse) {
      dispatch(setUpdateResponse(UpdateDoctorResponse));
      dispatch(GetDoctorInfo());
    }
  } catch (err) {
    console.log(err);
  }
};

export const DeleteDoctor = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await Api({
      method: 'DELETE',
      url: Constants.BaseUrl + ApiEndpoint.DeleteDoctor + `/${id}`
    }).then((res) => {
      toast.success(res?.data?.message);
      dispatch(GetDoctorInfo());
      return res?.data;
    });
  } catch (err) {
    console.log(err);
  }
};

const initialState = {
  DoctorInfoResponse: {
    data: {}
  },
  GetDoctorResponse: {
    data: []
  },
  updateResponse: {
    data: ''
  }
};
const DoctorSlice = createSlice({
  name: 'Doctors',
  initialState,
  reducers: {
    setPostInfo: (state, action) => {
      state.DoctorInfoResponse = {
        data: action.payload
      };
    },
    setDoctorInfo: (state, action) => {
      state.GetDoctorResponse = {
        data: action.payload
      };
    },
    setUpdateResponse: (state, action) => {
      state.updateResponse = {
        data: action.payload
      };
    }
  }
});
const { setDoctorInfo, setPostInfo, setUpdateResponse } = DoctorSlice.actions;
export default DoctorSlice.reducer;
