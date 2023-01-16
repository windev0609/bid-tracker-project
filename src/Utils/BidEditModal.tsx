import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './CustomPatientDelete.scss';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { DeleteDoctor } from '../Redux/DoctorSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { useState, FormEvent } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Grid, TextField, Checkbox, FormControlLabel, FormControl } from '@mui/material';
import FormikControl from '../CustomComponent/FormikControl';
import { UpdateDoctorInfo } from '../Redux/DoctorSlice';
import { IoIosClose } from 'react-icons/io';
import './CustomPatientDelete.scss';
const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  height: 700,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '16px'
};

const CustomDoctorDelete: React.FC<{ open: boolean; close: () => void; editData: any }> = ({
  open,
  close,
  editData
}) => {
  const [propsData, setPropsData] = useState(editData);
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = () => {
    // dispatch(DeleteDoctor(edit));
    close();
  };
  console.log(editData);
  // const useformik = useFormik({
  //   initialValues: {};
  // });
  // setPropsData(data);
  interface CountryOption {
    id: string;
    key: string;
    data: string;
  }
  interface SpecialistDoctor {
    id: string;
    key: string;
    data: string;
  }
  interface DoctorInfo {
    chat: string;
    user_name: string;
    bid_statement: string;
    client_price: number;
    client_name: string;
    client_country: string;
    client_verify_id: number;
    client_verify_payment: number;
    client_join_date: string;
    bid_num: number;
    when_jobs: string;
  }
  const signinSchema = Yup.object().shape({
    email: Yup.string().email().required('Enter valid email-id'),
    user_name: Yup.string().required('Yourname is required'),
    client_name: Yup.string().required('Clinetname is required'),
    bid_statement: Yup.string().required('bid is required'),
    client_price: Yup.string().required('price number is required'),
    client_country: Yup.string().required('country is required'),
    client_join_date: Yup.string().required('joinDate is required'),
    when_jobs: Yup.string().required('Whenjobs is required'),
    doctorImage: Yup.mixed().required('File is required'),
    client_verify_id: Yup.mixed().required('ClientIdVeryfy is required'),
    client_verify_payment: Yup.mixed().required('ClientPaymentVeryfy is required'),
    bid_num: Yup.mixed().required('ClientIdVeryfy is required')
  });

  const initial = {
    user_name: editData.user_name,
    bid_statement: editData.bid_statement,
    client_price: editData.client_price,
    client_name: editData.client_name,
    client_country: editData.client_country,
    client_verify_id: editData.client_verify_id,
    client_verify_payment: editData.client_verify_payment,
    client_join_date: editData.client_join_date,
    chat: editData.chat,
    bid_num: editData.bid_num,
    when_jobs: editData.when_jobs
  };

  const CountryOptions: CountryOption[] = [
    { id: '1', key: 'not verified', data: '0' },
    { id: '2', key: 'verified', data: '1' }
  ];

  const specialistData: SpecialistDoctor[] = [
    { id: '1', key: 'Dentist', data: 'Dentist' },
    { id: '2', key: 'Gaselogist', data: 'Gaselogist' },
    { id: '3', key: 'Neuro', data: 'Neuro' }
  ];
  type FormikSubmitEvent = FormEvent<HTMLFormElement> & {
    nativeEvent: { submitter?: HTMLButtonElement };
  };
  const [checkError, setCheckError] = useState<boolean>(false);
  const [formEvent, setFormEvent] = useState<FormikSubmitEvent | null>(null);
  const [image, setImg] = useState<string | ArrayBuffer | null>('');
  // const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (data: DoctorInfo) => {
    console.log('have done here of Submitting');
    console.log('BidsData', data);
    const formData: any = new FormData();
    console.log('success1', formData);
    console.log('success2:what data in formData', formData);
    // formData.append('doctorName', data?.doctorName);
    console.log(
      'see the formdata from UI: ',
      data,
      ', typeof Data:',
      typeof data,
      typeof data.client_verify_id
    );
    const biddata: DoctorInfo = {
      user_name: data.user_name,
      client_price: data.client_price,
      client_name: data.client_name,
      client_country: data.client_country,
      client_verify_id: data.client_verify_id,
      client_verify_payment: data.client_verify_payment,
      client_join_date: data.client_join_date,
      chat: data.chat,
      bid_num: data.bid_num,
      when_jobs: data.when_jobs,
      bid_statement: data.bid_statement
    };
    console.log('Hello it is edit id:', editData, editData.id);
    // setCheckError(!checkError);
    dispatch(UpdateDoctorInfo(editData.id, biddata));
    close();
  };
  const onSubmit = (values: DoctorInfo) => {
    console.log('Form submitting started and let/t see DoctorInfo', values);
    const buttonClicked = formEvent?.nativeEvent.submitter?.name;
    alert(`You submitted w/ button "${buttonClicked}"`);
    console.log('Hello Guys', values);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          {/* <div className="d-flex justify-content-center mb-3">
            <AiOutlineExclamationCircle className="delete--img" />
          </div> */}
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Bid
            </h5>
            <IoIosClose
              data-bs-dismiss="modal"
              aria-label="Close"
              className="icons"
              onClick={close}
            />
          </div>
          <div className="modal-body p-3">
            <Formik
              initialValues={{
                user_name: editData.user_name,
                bid_statement: editData.bid_statement,
                client_price: editData.client_price,
                client_name: editData.client_name,
                client_country: editData.client_country,
                client_verify_id: editData.client_verify_id,
                client_verify_payment: editData.client_verify_payment,
                client_join_date: editData.client_join_date,
                chat: editData.chat,
                bid_num: editData.bid_num,
                when_jobs: editData.when_jobs
              }}
              onSubmit={(data) => onSubmit(data)}
              validationSchema={signinSchema}>
              {(formik) => (
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log(
                      'have done have done of preventDefault and let me see "e":',
                      e,
                      'and let see now what is formik:',
                      formik,
                      'and at last let me know submitting data:',
                      formik.values
                    );
                    handleSubmit(formik.values);
                  }}>
                  <div>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <FormikControl
                          // default={editData.user_name}
                          key="user_name"
                          control="input"
                          type="text"
                          label="YourName"
                          name="user_name"
                          // initialValue={{ user_name: editData.user_name }}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.user_name && Boolean(formik.errors.user_name)}
                          helperText={formik.touched.user_name && formik.errors.user_name}
                          test="err1"
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <FormikControl
                          control="input"
                          type="text"
                          label="ClinetName"
                          name="client_name"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.client_name && Boolean(formik.errors.client_name)}
                          helperText={formik.touched.client_name && formik.errors.client_name}
                          test="err1"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          type="text"
                          label="ClientCountry"
                          name="client_country"
                          onChange={formik.handleChange}
                          error={
                            formik.touched.client_country && Boolean(formik.errors.client_country)
                          }
                          helperText={formik.touched.client_country && formik.errors.client_country}
                          test="err3"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          type="number"
                          label="ClientPayPrice"
                          name="client_price"
                          min={0}
                          max={1e10}
                          onChange={formik.handleChange}
                          error={formik.touched.client_price && Boolean(formik.errors.client_price)}
                          helperText={formik.touched.client_price && formik.errors.client_price}
                          test="err4"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          label="WhenClientJoin"
                          name="client_join_date"
                          type="date"
                          onChange={formik.handleChange}
                          error={
                            formik.touched.client_join_date &&
                            Boolean(formik.errors.client_join_date)
                          }
                          helperText={
                            formik.touched.client_join_date && formik.errors.client_join_date
                          }
                          test="err7"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          label="WhenJobJoin"
                          name="when_jobs"
                          type="date"
                          onChange={formik.handleChange}
                          error={formik.touched.when_jobs && Boolean(formik.errors.when_jobs)}
                          helperText={formik.touched.when_jobs && formik.errors.when_jobs}
                          test="err7"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          type="number"
                          label="BidCount"
                          name="bid_num"
                          min={0}
                          max={1e10}
                          onChange={formik.handleChange}
                          error={formik.touched.bid_num && Boolean(formik.errors.bid_num)}
                          helperText={formik.touched.bid_num && formik.errors.bid_num}
                          test="err4"
                        />
                      </Grid>
                      <Grid item xs={6}></Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="select"
                          type="checkbox"
                          label="ClientIDVerify"
                          name="client_verify_id"
                          options={CountryOptions}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.client_verify_id &&
                            Boolean(formik.errors.client_verify_id)
                          }
                          helperText={
                            formik.touched.client_verify_id && formik.errors.client_verify_id
                          }
                          test="err4"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="select"
                          type="checkbox"
                          label="ClientPaymentVerify"
                          name="client_verify_payment"
                          options={CountryOptions}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.client_verify_payment &&
                            Boolean(formik.errors.client_verify_payment)
                          }
                          helperText={
                            formik.touched.client_verify_payment &&
                            formik.errors.client_verify_payment
                          }
                          test="err4"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          type="textField"
                          // rows={4}
                          label="Bid"
                          multilin
                          name="bid_statement"
                          onChange={formik.handleChange}
                          error={
                            formik.touched.bid_statement && Boolean(formik.errors.bid_statement)
                          }
                          helperText={formik.touched.bid_statement && formik.errors.bid_statement}
                          test="err4"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControl
                          control="input"
                          type="textField"
                          // rows={4}
                          label="Chat"
                          multilin
                          name="chat"
                          onChange={formik.handleChange}
                          error={formik.touched.chat && Boolean(formik.errors.chat)}
                          helperText={formik.touched.chat && formik.errors.chat}
                          test="err4"
                        />
                      </Grid>
                      {/* <Grid item xs={12}>
                    <mui.FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <mui.InputLabel htmlFor="filled-adornment-amount">Chat</mui.InputLabel>
                      <mui.FilledInput
                        id="filled-adornment-chat"
                        name="chat"
                        rows={4}
                        multiline
                      />
                    </mui.FormControl>
                  </Grid> */}
                    </Grid>
                    <div></div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center gap-3 mt-4">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={close}>
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-secondary"
                      // data-bs-dismiss={`${checkError ? 'modal' : ''}`}
                      data-bs-dismiss={'modal'}
                      aria-label="Close">
                      save
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="Delete--container d-flex justify-content-center flex-column">
            {/* <div className="Delete--container-text">hello</div> */}
            {/* <div className="d-flex justify-content-center gap-5 mt-5">
              <button className="Delete--container-btn cancel border-0" onClick={close}>
                Cancel
              </button>
              <button className="Delete--container-btn success border-0" onClick={handleDelete}>
                Yes
              </button>
            </div> */}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomDoctorDelete;
