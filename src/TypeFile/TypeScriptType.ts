export interface BidType {
  id: number;
  user_name: string;
  bid_statement: boolean;
  client_price: number;
  client_name: string;
  client_country: string;
  client_verify_id: number;
  client_verify_payment: number;
  client_join_date: number;
  chat: string;
  bid_num: number;
  when_jobs: string;
}
export interface Signup {
  username: string;
  password: string;
  email: string;
  role: string;
}
export interface Signin {
  email: string;
  user_password: string;
}

export interface DoctorProfile {
  _id: string;
  doctorName: string;
  address: string;
  specialist: string;
  dob: string;
  empId: string;
  country: string;
  email: string;
  phoneNumber: string;
  doctorImage: string;
  __v: number;
}

export interface DataType {
  patientName: string;
  ageField: number;
  address: string;
  admitDate: string;
  country: string;
  phoneNumber: string;
  dob: string;
  email: string;
  _id: string;
  patientImage: string;
}
export interface EditType {
  patientName: string;
  ageField: number;
  address: string;
  admitDate: string;
  country: string;
  phoneNumber: string;
  dob: string;
  email: string;
  _id: string;
  patientImage: string;
}

export interface DoctorEditType {
  email: string;
  doctorImage: string;
  doctorName: string;
  address: string;
  phoneNumber: string;
  dob: string;
  specialist: string;
  country: string;
  _id: string;
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

export interface PatientModel {
  patientName: string;
  ageField: number;
  address: string;
  admitDate: string;
  country: string;
  phoneNumber: string;
  dob: string;
  email: string;
  patientImage: string;
}

export type UserContextType = {
  editModal: (data: EditType) => void;
  EditedData: EditType;
  show: boolean;
  AuthTool: (state: boolean) => void;
  hideSidebar: boolean;
  editDoctorModal: (state: DoctorEditType) => void;
  EditedDoctor: DoctorEditType;
  MobileDrawer: (state: boolean) => void;
};

export interface NumericValue {
  name: string;
  amount: string;
}

export interface TableSetup {
  tableHeader: string;
  data: NumericValue[];
}
export interface TimelineSetup {
  date: string;
  reportHeading: string;
  bloodReport: boolean;
  admitReport: boolean;
  checkupReport: boolean;
  surgeryReport: boolean;
  images: Array<string>;
  description: string;
  reportTable: TableSetup[];
}
export interface Setup {
  id: string;
  username: string;
  TimeLine: TimelineSetup[];
}
