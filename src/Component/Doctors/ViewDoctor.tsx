import { useLocation } from 'react-router-dom';
import { Card, CardContent, Avatar, Grid, Paper, Box } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
import AdbOutlinedIcon from '@mui/icons-material/AdbOutlined';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import './ViewDoctor.scss';

const ViewDoctor = () => {
  const location: any = useLocation();
  console.log(location);
  const detail = location.state;

  return (
    <div className="w-100">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={4} xl={4}>
              <div className="w-100">
                <Card sx={{ minWidth: 275, backgroundColor: '#DCDCDC' }}>
                  <CardContent>
                    <div className="d-flex justify-content-center p-3">
                      <Avatar
                        alt="Remy Sharp"
                        src={detail.doctorImage}
                        sx={{ width: 150, height: 150 }}
                      />
                    </div>
                    <div className="content">
                      <h6 className="content-name">{detail.doctorName}</h6>
                      <span className="content-text">{detail.address}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Paper className="mt-4 ">
                <div className="d-flex p-2">Doctors Achievements</div>
                <section className="p-3 activities">
                  <ul className="timeline">
                    <li className="timeline-item mb-5  d-flex align-items-start flex-column">
                      <p className="text-date">12-04-2018 - Today</p>
                      <h5 className="mb-2 fw-bold">Heart operation</h5>
                      <p className="text-name">
                        <span>Elisse Joson</span> San Francisco, CA
                      </p>
                      {/* <p className="text-comment">
                        I&apos;m speaking with myself, number one, because I have a very good brain
                        and I&apos;ve said a lot of things.
                      </p> */}
                    </li>
                    <li className="timeline-item mb-5  d-flex align-items-start flex-column">
                      <p className="text-date">20-04-2018 - Today</p>
                      <h5 className="mb-2 fw-bold">Brain Tumor cases</h5>
                      <p className="text-name">
                        <span>Elisse Joson</span> San Francisco, CA
                      </p>
                    </li>
                    <li className="timeline-item mb-5  d-flex align-items-start flex-column">
                      <p className="text-date">11-04-2018 - Today</p>
                      <h5 className="mb-2 fw-bold">A Brief History Of Anesthetics</h5>
                      <p className="text-name">
                        <span>Elisse Joson</span> San Francisco, CA
                      </p>
                      {/* <p className="text-comment">
                        I&apos;m speaking with myself, number one, because I have a very good brain
                        and I&apos;ve said a lot of things.
                      </p> */}
                    </li>
                  </ul>
                </section>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={8} xl={8}>
              <Paper elevation={1}>
                <Grid container>
                  <Grid item xs={12} md={12} lg={12} xl={12}>
                    <Grid container>
                      <Grid item xs={12} md={12} lg={3} xl={3}>
                        <div className="d-flex flex-column gap-2 justify-content-center pt-4 pb-4 align-items-center">
                          <div className="cart--show">
                            <ThumbUpAltIcon className="cart--show-icon" />
                            <div className="cart--show-number">2345</div>
                            <div className="cart--show-text">Experience</div>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={12} md={12} lg={3} xl={3}>
                        <div className="d-flex flex-column gap-2 justify-content-center pt-4 pb-4 align-items-center">
                          <div className="cart--show">
                            <StarPurple500OutlinedIcon className="cart--show-icon" />
                            <div className="cart--show-number">2345</div>
                            <div className="cart--show-text">Awards</div>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={12} md={12} lg={3} xl={3}>
                        <div className="d-flex flex-column gap-2 justify-content-center pt-4 pb-4 align-items-center">
                          <div className="cart--show">
                            <PersonSharpIcon className="cart--show-icon" />
                            <div className="cart--show-number">2345</div>
                            <div className="cart--show-text">Clients</div>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={12} md={12} lg={3} xl={3}>
                        <div className="d-flex flex-column gap-2 justify-content-center pt-4 pb-4 align-items-center">
                          <div className="cart--show">
                            <AdbOutlinedIcon className="cart--show-icon" />
                            <div className="cart--show-number">2345</div>
                            <div className="cart--show-text">Surgery</div>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
              <Box className="mt-3"></Box>
              {/* <UpdateDoctorComponent/> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ViewDoctor;
