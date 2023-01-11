import { createSlice } from '@reduxjs/toolkit';
import axios, { Axios } from 'axios';
import { Constants, ApiEndpoint } from '../Constants/Constant';
import TokenService from '../Constants/token.service';
import Api from '../Constants/Instance';
import { toast } from 'react-toastify';
import { AppDispatch } from '../store';
import { Signin, Signup } from '../TypeFile/TypeScriptType';
import { url } from 'inspector';

export const SignupAction = (data: Signup) => async (dispatch: AppDispatch) => {
  try {
    const SignupResponse = await axios({
      method: 'POST',
      url: Constants.BaseUrl + ApiEndpoint.SignupAuthentication,
      data
    }).then((res) => {
      return res.data;
    });
    if (SignupResponse) {
      TokenService.setSignupUser(SignupResponse?.token);
      dispatch(setSignUpSuccess(SignupResponse));
      dispatch(setStatus('success'));
      toast.success('successfully user signed');
    }
  } catch (err) {
    console.log(err);
    const error = err as any;
    const { message } = error.response.data;
    dispatch(setStatus('error'));
    toast.error(message);
  }
};

export const LoginAction = (data: Signin, navigate: any) => async (dispatch: AppDispatch) => {
  try {
    // axios
    //   .post('http://192.168.104.113:8080/api/login', data)
    //   .then((res) => {
    //     console.log('res:', res);
    //   })
    //   .catch((err) => {
    //     console.log('error:', err);
    //   });
    console.log('Signin:', data);
    const LoginResponse = await axios({
      method: 'POST',
      url: Constants.BaseUrl + ApiEndpoint.LoginAuthentication,
      data
    })
      .then((res) => {
        console.log('what is return', res.data);
        return res.data;
      })
      .catch((err) => {
        console.log('what is error', err);
        return err;
      });
    if (LoginResponse) {
      navigate('/dashboard/maindashboard');
      if (LoginResponse.token && LoginResponse.refreshToken) {
        TokenService.setAccessToken(LoginResponse?.token);
        TokenService.setRefreshToken(LoginResponse?.refreshToken);
        navigate('/dashboard/maindashboard');
      }
      dispatch(setLoginSuccess(LoginResponse));
      dispatch(setStatus('success'));
    }
  } catch (err) {
    const error = err as any;
    const { message } = error.response.data;
    dispatch(setStatus('error'));
    toast.error(message);
  }
};

export const getUserList = () => async (dispatch: AppDispatch) => {
  try {
    const userList = await Api({
      method: 'GET',
      url: Constants.BaseUrl + ApiEndpoint.getAllUser,
      headers: { authorization: TokenService.getAccessToken() }
    }).then((res) => {
      return res.data;
    });
    if (userList) {
      dispatch(setStatus('success'));
      dispatch(AllUserList(userList));
    }
  } catch (err) {
    console.log(err);
    dispatch(setStatus('error'));
  }
};
export const reset = () => async (dispatch: AppDispatch) => {
  dispatch(ResetStatus());
};

const initialState = {
  SignupResponse: {
    data: {}
  },
  LoginResponse: {
    data: {}
  },
  userListResponse: {
    data: {}
  },
  status: 'loading'
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSignUpSuccess: (state, action) => {
      state.SignupResponse = {
        data: action.payload
      };
    },
    setLoginSuccess: (state, action) => {
      state.LoginResponse = {
        data: action.payload
      };
    },
    AllUserList: (state, action) => {
      state.userListResponse = {
        data: action.payload
      };
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    ResetStatus: (state) => {
      state.status = 'loading';
    }
  }
});

export const { setSignUpSuccess, setLoginSuccess, AllUserList, setStatus, ResetStatus } =
  usersSlice.actions;

export default usersSlice.reducer;
