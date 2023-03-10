export class Constants {
  // static BaseUrl = process.env.REACT_APP_API_URL;
  //static BaseUrl = 'http://localhost:3007';
  static BaseUrl = 'http://192.168.104.113:8080';
}
export class ApiEndpoint {
  static LoginAuthentication = '/api/login';
  static SignupAuthentication = '/authenticate/signup';
  static getAllUser = '/authenticate/getAllUser';
  static refreshAuth = '/authenticate/refresh';
  static PostDoctorInfo = '/api/bids';
  static GetDoctorInfo = '/api/bids';
  static PostPatientInfo = '/patient/patientAdd';
  static GetPatientInfo = '/patient/patientGet';
  static UpdatePatientInfo = '/patient/patientUpdate';
  static UpdateDoctorInfo = '/api/bids';
  static DeletePatientInfo = '/patient/patientDelete';
  static GetPatienById = 'patientFind';
  static DeleteDoctor = '/api/bids';
}
