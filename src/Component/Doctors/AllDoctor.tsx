import React, { useEffect, useCallback, useState } from 'react';
import './AllDoctor.scss';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { GetDoctorInfo } from '../../Redux/DoctorSlice';
import { DoctorProfile, UserContextType, DoctorEditType } from '../../TypeFile/TypeScriptType';
import CustomAddModal from '../../Utils/CustomAddModal';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CustomDoctorEdit from '../../Utils/CustomDoctorEdit';
import CustomDoctorDelete from '../../Utils/CustomDoctorDelete';
import { userContext } from '../../Context/userContext';
import { Dots } from 'react-activity';
import 'react-activity/dist/library.css';

import { BsChatLeftText } from 'react-icons/bs';

const AllDoctor = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);
  const [edit, setEditId] = React.useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const { editDoctorModal } = React.useContext(userContext) as UserContextType;
  const Loader = () => {
    return <Dots color="#727981" size={32} speed={1} animating={true} />;
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditProfile = (record: DoctorEditType) => {
    editDoctorModal(record);
  };
  const handleDeleteProfile = (record: DoctorEditType) => {
    setEditId(record._id);
    setOpen(true);
  };
  const GetDoctorData = useSelector((state: RootState) => state?.Doctors.GetDoctorResponse);
  const reportsData = GetDoctorData?.data;
  const getAllDoctorProfiles = useCallback(async () => {
    try {
      dispatch(GetDoctorInfo());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);
  useEffect(() => {
    if (reportsData.length > 0) {
      setLoading(false);
    }
  }, [reportsData]);

  useEffect(() => {
    getAllDoctorProfiles();
  }, [getAllDoctorProfiles]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'username', headerName: 'UserName', width: 130 },
    { field: 'clientname', headerName: 'ClientName', width: 180 },
    {
      field: 'ccountry',
      headerName: 'ClientCountry',
      width: 180
    },
    { field: 'joindate', headerName: 'JoinDate', width: 200 },
    { field: 'jobjoindate', headerName: 'JobJoinDate', width: 200 },
    { field: 'bidcount', headerName: 'BidCount' }
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`
    // }
  ];

  return (
    <div className="w-100 mt-3 cursor-pointer">
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Grid container>
            <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
              <div className="w-100 h-100 card--shadow">
                <div className="w-48 h-100 rounded overflow-hidden shadow-lg d-flex justify-content-center align-items-center">
                  <div className="d-flex justify-content-center p-3 flex-column align-items-center">
                    <div>
                      <p className="add--icon-content">Add new Bid</p>
                    </div>
                    <div className="add--icon">
                      <AddIcon data-bs-toggle="modal" data-bs-target="#exampleModal" />
                    </div>
                  </div>
                </div>
              </div>
              <CustomAddModal id={'exampleModal'} />
            </Grid>
            {/* {loading && <Loader />} */}
            {/* {reportsData?.length === 0 ? (
              reportsData?.map((item: DoctorProfile) => {
                return (
                  <>
                    <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
                      <div className="w-100 card--shadow" key={item.empId}>
                        <div className="w-48 rounded overflow-hidden shadow-lg">
                          <Link to={`/dashboard/ViewDoctor`} state={item}>
                            <div>
                              <div className="d-flex justify-content-center p-3">
                                <div className="rounded--image">
                                  <img className="" src={item.doctorImage} alt="doc" />
                                </div>
                              </div>
                              <div className="px-6 py-4 card--content">
                                <div className="font-bold text-xl card--content-name">
                                  {item?.doctorName}
                                </div>
                                <span className="card--content-role">{item?.specialist}</span>
                                <div>
                                  <p className="card--content-address mt-2">{item.address}</p>
                                </div>
                              </div>
                            </div>
                          </Link>
                          <div>
                            <Tooltip title="Edit" placement="top">
                              <IconButton onClick={() => handleEditProfile(item)}>
                                <BiEdit
                                  className="icon--edit"
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModalEdit"
                                />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete" placement="top">
                              <IconButton onClick={() => handleDeleteProfile(item)}>
                                <AiOutlineDelete className="icon--delete" />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </>
                );
              })
            ) : (
              // <div className="d-flex flex-column flex-grow-1 justify-content-center align-items-center">
              //   <IoMdMan className="error--icon" />
              //   <p className="font">no any doctors</p>
              // </div>
              <Loader />
            )} */}
            <div style={{ height: '100vh', width: '100%' }}>
              <DataGrid
                rows={reportsData ? reportsData : []}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
      <CustomDoctorEdit id={'exampleModalEdit'} />
      <CustomDoctorDelete open={open} close={handleClose} edit={edit} />
    </div>
  );
};

export default AllDoctor;
