import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './CustomPatientDelete.scss';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { DeleteDoctor } from '../Redux/DoctorSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const CustomDoctorDelete: React.FC<{ open: boolean; close: () => void; edit: any }> = ({
  open,
  close,
  edit
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = () => {
    dispatch(DeleteDoctor(edit.id));
    close();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="d-flex justify-content-center mb-3">
            <AiOutlineExclamationCircle className="delete--img" />
          </div>
          <div className="Delete--container d-flex justify-content-center flex-column">
            <div className="Delete--container-text">Do you want to delete a Bid?</div>
            <div className="d-flex justify-content-center gap-5 mt-5">
              <button className="Delete--container-btn cancel border-0" onClick={close}>
                Cancel
              </button>
              <button className="Delete--container-btn success border-0" onClick={handleDelete}>
                Yes
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomDoctorDelete;
