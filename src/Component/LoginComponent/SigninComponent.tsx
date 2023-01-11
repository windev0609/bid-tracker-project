import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { LoginAction, reset } from '../../Redux/AuthenticationSlice';
import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { Dots } from 'react-activity';
import 'react-activity/dist/library.css';
import { userContext } from '../../Context/userContext';

import { Signin, UserContextType } from '../../TypeFile/TypeScriptType';
import { useNavigate } from 'react-router-dom';
const signinSchema = Yup.object().shape({
  email: Yup.string().email().required('Enter valid email-id'),
  user_password: Yup.string()
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
    //   'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    // )
    .required('Password is required')
});
const SigninComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const LoginResponse = useSelector((state: RootState) => state?.users.status);
  // console.log(LoginResponse, 'same');
  const [loading, setLoading] = useState<boolean>(false);
  const { AuthTool } = React.useContext(userContext) as UserContextType;
  const handleLoginSubmit = (values: Signin) => {
    setLoading(true);
    const loginData = {
      email: values.email,
      user_password: values.user_password
    };
    dispatch(LoginAction(loginData, navigate));
  };
  const Loader = () => {
    return <Dots color="#727981" size={32} speed={1} animating={true} />;
  };
  const goToSignUp = () => {
    AuthTool(false);
  };
  useEffect(() => {
    if (LoginResponse === 'success' || LoginResponse === 'error') {
      setLoading(false);
    }
  }, [LoginResponse]);
  useEffect(() => {
    reset();
  }, [true]);
  return (
    <div>
      <Formik
        initialValues={{
<<<<<<< HEAD
          user_password: '',
          email: ''
=======
          email: '',
          user_password: ''
>>>>>>> e6cc090ade9a69a83c680b2456b8b44d668ae3a1
        }}
        onSubmit={(values) => handleLoginSubmit(values)}
        validationSchema={signinSchema}>
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <div className="container">
              <h1 className="heading mt-3 mb-4">Signin Account</h1>
              <div className="d-flex flex-column gap-3 main--input">
                <input
                  placeholder="email"
                  id="SigninEmail"
                  name="email"
                  type="text"
                  onChange={formik.handleChange}
                  data-testid="email"
                />
                <p className="error-text" data-testid="error-test1">
                  {formik.errors.email}
                </p>
                <input
                  placeholder="password"
                  name="user_password"
                  type="text"
                  onChange={formik.handleChange}
                  data-testid="user_password"
                />
                <p className="error-text" data-testid="error-test2">
                  {formik.errors.user_password}
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <button className="btn--container" type="submit">
                  Sign in
                </button>
              </div>
              {loading && <Loader />}
              <p className="login--text mt-3">
                Dont&apos;t have an account <span onClick={goToSignUp}>Signup</span>?
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SigninComponent;
