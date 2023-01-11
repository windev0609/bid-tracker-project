import React, { useState } from 'react';
import { UserContextType, EditType, DoctorEditType } from '../TypeFile/TypeScriptType';

export const userContext = React.createContext<UserContextType | null>(null);

interface Props {
  children: React.ReactNode;
}
const UserProvider: React.FC<Props> = ({ children }) => {
  const [EditedData, setEdited] = useState<EditType>({
    patientName: '',
    ageField: 0,
    admitDate: '',
    dob: '',
    country: '',
    email: '',
    address: '',
    phoneNumber: '',
    _id: '',
    patientImage: ''
  });
  const [EditedDoctor, setEditedDoctor] = useState<DoctorEditType>({
    email: '',
    doctorName: '',
    address: '',
    phoneNumber: '',
    dob: '',
    specialist: '',
    country: '',
    _id: '',
    doctorImage: '',
    yourName: '',
    clientCountry: '',
    clientPayPrice: '',
    whenClientJoin: '',
    whenJobJoin: '',
    bidCount: '',
    clientPV: '',
    clientIV: '',
    bid: '',
    chat: ''
  });
  const [show, setShow] = useState<boolean>(false);
  const [hideSidebar, sethideBar] = useState<boolean>(true);
  const editModal = (data: EditType) => {
    setEdited(data);
  };
  const editDoctorModal = (data: DoctorEditType) => {
    setEditedDoctor(data);
  };
  const AuthTool = (state: boolean): void => {
    setShow(state);
  };
  const MobileDrawer = (): void => {
    sethideBar(!hideSidebar);
  };
  return (
    <userContext.Provider
      value={{
        show,
        EditedData,
        editModal,
        EditedDoctor,
        editDoctorModal,
        AuthTool,
        hideSidebar,
        MobileDrawer
      }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
