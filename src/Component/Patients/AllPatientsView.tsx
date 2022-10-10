import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useCallback, useState, useMemo } from 'react';
import './AllPatientsView.scss';
import 'antd/dist/antd.css';
import { GrView, GrFormAdd } from 'react-icons/gr';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import CustomPatientAddModal from '../../Utils/CustomPatientAddModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { GetPatientInfo } from '../../Redux/PatientSlice';
import CustomPatientEditModal from '../../Utils/CustomPatientEditModal';
import { UserContextType, EditType, DataType } from '../../TypeFile/TypeScriptType';
import { userContext } from '../../Context/userContext';
import CustomPatientDelete from '../../Utils/CustomPatientDelete';
import Pagination from '@mui/material/Pagination';
import PaginationHook from '../../Utils/PaginationHook';
import { Dots } from 'react-activity';
import 'react-activity/dist/library.css';

const AllPatientsView: React.FC = () => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [edit, setEditId] = React.useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [table, setTable] = useState<boolean>(false);
  const { editModal } = React.useContext(userContext) as UserContextType;
  const dispatch = useDispatch<AppDispatch>();
  const GetResponseData = useSelector((state: RootState) => state?.patient.GetPatientResponse);
  const reportsData = GetResponseData?.data;
  const PerPage = 5;
  const count = Math.ceil(reportsData.length / PerPage);
  const datas = PaginationHook(reportsData, PerPage);
  useEffect(() => {
    if (reportsData) {
      setLoading(false);
      setTable(true);
    }
  }, [reportsData]);
  const Loader = () => {
    return <Dots color="#727981" size={32} speed={1} animating={true} />;
  };
  const handleChange = (_event: React.ChangeEvent<unknown>, p: number): void => {
    setPage(p);
    datas.jump(p);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const getAllPatientProfile = useCallback(async () => {
    try {
      dispatch(GetPatientInfo());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    getAllPatientProfile();
  }, [getAllPatientProfile]);
  const columns = useMemo<ColumnsType<DataType>>(() => {
    return [
      {
        title: 'patientName',
        dataIndex: 'patientName',
        width: 150
      },
      {
        title: 'Age',
        dataIndex: 'ageField',
        width: 100
      },
      {
        title: 'Address',
        dataIndex: 'address',
        width: 150
      },
      {
        title: 'admitDate',
        dataIndex: 'admitDate',
        width: 150,
        render: (date: string) => getFullDate(date)
      },
      {
        title: 'phoneNumber',
        dataIndex: 'phoneNumber',
        width: 140
      },
      {
        title: 'Action',
        dataIndex: '',
        width: 100,
        render: (record: EditType) => {
          return (
            <div className="d-flex gap-3">
              <div>
                <GrView className="icon--hover" onClick={() => handleViewProfile(record)} />
              </div>
              <div>
                <GrFormAdd
                  className="icon--hover"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModals"
                />
                <CustomPatientAddModal id={'exampleModals'} />
              </div>
              <div>
                <BiEdit
                  className="icon--hover"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleEditProfile(record)}
                />
              </div>
              <div>
                <AiOutlineDelete
                  className="icon--hover"
                  onClick={() => handleDeleteProfile(record)}
                />
              </div>
            </div>
          );
        }
      }
    ];
  }, []);
  const getFullDate = (date: string): string => {
    const dateAndTime = date.split('T');

    return dateAndTime[0].split('-').reverse().join('-');
  };
  const handleEditProfile = (record: EditType) => {
    editModal(record);
  };
  const handleDeleteProfile = (record: EditType) => {
    setEditId(record?._id);
    setOpen(true);
  };
  const handleViewProfile = (record: EditType) => {
    navigate('/dashboard/viewPatients', {
      state: record
    });
  };

  return (
    <div className="">
      {loading && <Loader />}
      {loading ? null : (
        <div>
          {table && (
            <>
              <Table
                columns={columns}
                dataSource={datas?.currentData()}
                scroll={{ y: 240 }}
                pagination={false}
              />
              <Pagination
                count={count}
                page={page}
                variant="outlined"
                shape="rounded"
                className="mt-3 d-flex justify-content-end me-2"
                onChange={handleChange}
              />
            </>
          )}
        </div>
      )}
      <CustomPatientEditModal id={'exampleModal'} />
      <CustomPatientDelete open={open} close={handleClose} edit={edit} />
    </div>
  );
};
export default AllPatientsView;
