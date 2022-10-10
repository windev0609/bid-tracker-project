const setSignupUser = (user: string) => {
  sessionStorage.setItem('user', JSON.stringify(user));
};
const setAccessToken = (user: string) => {
  sessionStorage.setItem('accessToken', JSON.stringify(user));
};
const setRefreshToken = (user: string) => {
  sessionStorage.setItem('RefreshToken', JSON.stringify(user));
};
const UpdateAccessToken = (token: string) => {
  let user = JSON.parse(sessionStorage.getItem('accessToken') || '{}');
  user = token;
  sessionStorage.setItem('accessToken', JSON.stringify(user));
};
const getAccessToken = () => JSON.parse(sessionStorage.getItem('accessToken') || '{}');
const getRefreshToken = () => JSON.parse(sessionStorage.getItem('RefreshToken') || '{}');
const setUserImage = (image: string) => {
  sessionStorage.setItem('userImg', JSON.stringify(image));
};
const getUserImage = () => JSON.parse(sessionStorage.getItem('userImg') || '{}');

const TokenService = {
  setSignupUser,
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  getRefreshToken,
  UpdateAccessToken,
  setUserImage,
  getUserImage
};
export default TokenService;
