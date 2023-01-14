import axios from 'axios';
import { ApiEndpoint, Constants } from './Constant';
import TokenService from '../Constants/token.service';
const instance = axios.create({
  baseURL: Constants.BaseUrl,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

instance.interceptors.request.use(
  (config) => {
    config.headers = {
      authorization: TokenService.getAccessToken(),
      'Content-Type': 'application/json'
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error?.response?.status === 401) {
      originalConfig._retry = true;
      if (error.response.data.message === 'Unauthorized! Access Token was expired!') {
        try {
          const refreshToken = TokenService.getRefreshToken();

          const res = await instance.post(ApiEndpoint.refreshAuth, {
            authorization: refreshToken
          });

          TokenService.UpdateAccessToken(res?.data?.newAccess);
          instance.defaults.headers.common['authorization'] = res?.data?.newAccess;
          return instance(originalConfig);
        } catch (err) {
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
