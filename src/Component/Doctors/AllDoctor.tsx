import React, { useEffect, useCallback, useState } from 'react';
import './AllDoctor.scss';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams
} from '@mui/x-data-grid';
import { Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { GetDoctorInfo } from '../../Redux/DoctorSlice';
import {
  DoctorProfile,
  UserContextType,
  DoctorEditType,
  BidType
} from '../../TypeFile/TypeScriptType';
import CustomAddModal from '../../Utils/CustomAddModal';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CustomDoctorEdit from '../../Utils/CustomDoctorEdit';
import CustomDoctorDelete from '../../Utils/CustomDoctorDelete';
import BidEditModal from '../../Utils/BidEditModal';
import { userContext } from '../../Context/userContext';
import { Dots } from 'react-activity';
import 'react-activity/dist/library.css';

import { BsChatLeftText } from 'react-icons/bs';

const AllDoctor = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [edit, setEditId] = React.useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [sendData, setSendData] = useState<BidType>();
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
      dispatch(GetDoctorInfo())
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
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

  const handleOpenModal = (record: BidType) => {
    console.log(record);
    setSendData(record);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const RenderData = (props: GridRenderCellParams) => {
    // console.log(props);
    const { hasFocus, row } = props;
    // const buttonElement = React.useRef<HTMLButtonElement | null>(null);

    return (
      <strong>
        <Button
          component="button"
          // ref={buttonElement}
          variant="contained"
          size="small"
          style={{ marginLeft: 16 }}
          // Remove button from tab sequence when cell does not have focus
          tabIndex={hasFocus ? 0 : -1}
          onClick={() => {
            handleOpenModal(row);
          }}>
          Open
        </Button>
      </strong>
    );
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'No', width: 70 },
    {
      field: 'user_name',
      headerName: 'UserName',
      width: 130
    },
    { field: 'client_name', headerName: 'ClientName', width: 180 },
    {
      field: 'client_country',
      headerName: 'ClientCountry',
      width: 180
    },
    { field: 'client_join_date', headerName: 'JoinDate', width: 200 },
    { field: 'when_jobs', headerName: 'JobJoinDate', width: 200 },
    { field: 'bid_num', headerName: 'BidCount', width: 100 },
    {
      field: '',
      headerName: 'Action',
      // renderCell: (params: GridRenderCellParams<Date>) => (
      //   <strong>
      //     <Button
      //       variant="contained"
      //       size="small"
      //       style={{ marginLeft: 16 }}
      //       tabIndex={params.hasFocus ? 0 : -1}
      //       onClick={handleOpenModal}>
      //       Detail
      //     </Button>
      //   </strong>
      renderCell: RenderData
    }
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
            <div style={{ height: 371, width: '100%' }}>
              <DataGrid
                rows={reportsData ? reportsData : []}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // checkboxSelection
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
      <BidEditModal open={showModal} close={handleCloseModal} data={sendData ? sendData : []} />
      {/* <CustomDoctorEdit id={'exampleModalEdit'} />
      <CustomDoctorDelete open={open} close={handleClose} edit={edit} /> */}
    </div>
  );
};

export default AllDoctor;
