import React, { useState, useEffect } from 'react';
import './SignupPage.scss';
import doctorImage from '../../Assets/doctor-medicine.svg';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Dots } from 'react-activity';
import { useDispatch, useSelector } from 'react-redux';
import SigninComponent from './SigninComponent';
import { AppDispatch, RootState } from '../../store';
import { Signup, UserContextType } from '../../TypeFile/TypeScriptType';
import { SignupAction } from '../../Redux/AuthenticationSlice';
import { userContext } from '../../Context/userContext';
const SignupPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const signupSchema = Yup.object().shape({
    email: Yup.string().email().required('Enter valid email-id'),
    username: Yup.string().required('Please enter user name'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      )
      .required('Password is required'),
    role: Yup.string().required('Please enter role')
  });
  const SignResponse = useSelector((state: RootState) => state?.users.status);
  const [loading, setLoading] = useState<boolean>(false);
  const { show, AuthTool } = React.useContext(userContext) as UserContextType;

  const handleSignUpSubmit = (values: Signup) => {
    setLoading(true);
    dispatch(SignupAction(values));
  };
  const GotoLogin = () => {
    AuthTool(true);
  };
  useEffect(() => {
    if (SignResponse === 'success' || SignResponse === 'error') {
      setLoading(false);
    }
  }, [SignResponse]);
  const Loader = () => {
    return <Dots color="#727981" size={32} speed={1} animating={true} />;
  };

  return (
    <div className="login--box">
      <div className="container-fluid login--container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 login--container-active">
            <div className="d-flex justify-content-center align-items-center mt-5">
              <img src={doctorImage} alt="medicalImage" />
            </div>
          </div>

          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 login--container-inactive d-flex justify-content-center align-items-center">
            <div className="p-5 account--container d-flex justify-content-center">
              {show === false ? (
                <Formik
                  initialValues={{
                    username: '',
                    password: '',
                    role: '',
                    email: ''
                  }}
                  onSubmit={(data) => handleSignUpSubmit(data)}
                  validationSchema={signupSchema}>
                  {(formikSignup) => (
                    <Form onSubmit={formikSignup.handleSubmit}>
                      <div className="container">
                        <h1 className="heading mt-3 mb-4">Create Account</h1>

                        <div className="d-flex flex-column gap-1 main--input">
                          <input
                            placeholder="email"
                            id="email"
                            name="email"
                            onChange={formikSignup.handleChange}
                            data-testid="email"
                          />
                          <p className="error-text" data-testid="error-test1">
                            {formikSignup.errors.email}
                          </p>
                          <input
                            placeholder="name"
                            name="username"
                            onChange={formikSignup.handleChange}
                            data-testid="username"
                          />
                          <p className="error-text" data-testid="error-test2">
                            {formikSignup.errors.username}
                          </p>
                          <input
                            placeholder="password"
                            name="password"
                            onChange={formikSignup.handleChange}
                            data-testid="password"
                          />
                          <p className="error-text" data-testid="error-test3">
                            {formikSignup.errors.password}
                          </p>
                        </div>
                        <div className="d-flex gap-3">
                          <select
                            name="role"
                            className="form-select select-container"
                            onChange={formikSignup.handleChange}
                            data-testid="role"
                            aria-label="Default select example">
                            <option selected>select role</option>
                            <option value="doctor">admin</option>
                          </select>
                        </div>
                        <p className="error-text" data-testid="error-test4">
                          {formikSignup.errors.role}
                        </p>
                        <div className="d-flex align-items-center justify-content-center">
                          <button className="btn--container" type="submit">
                            Sign up
                          </button>
                        </div>
                        {loading && <Loader />}
                        <p className="login--text mt-3">
                          Already have an account <span onClick={GotoLogin}>Login</span>?
                        </p>
                      </div>
                    </Form>
                  )}
                </Formik>
              ) : (
                <SigninComponent />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
