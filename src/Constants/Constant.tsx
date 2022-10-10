export class Constants {
  //static BaseUrl=process.env.REACT_APP_API_URL;
  //static BaseUrl = 'http://localhost:3007';
  static BaseUrl = 'https://ploarpet.herokuapp.com';
}
export class ApiEndpoint {
  static LoginAuthentication = '/authenticate/login';
  static SignupAuthentication = '/authenticate/signup';
  static getAllUser = '/authenticate/getAllUser';
  static refreshAuth = '/authenticate/refresh';
  static PostDoctorInfo = '/doctor/doctorAdd';
  static GetDoctorInfo = '/doctor/getDoctor';
  static PostPatientInfo = '/patient/patientAdd';
  static GetPatientInfo = '/patient/patientGet';
  static UpdatePatientInfo = '/patient/patientUpdate';
  static UpdateDoctorInfo = '/doctor/doctorUpdate';
  static DeletePatientInfo = '/patient/patientDelete';
  static GetPatienById = 'patientFind';
  static DeleteDoctor = '/doctor/doctorDelete';
}
