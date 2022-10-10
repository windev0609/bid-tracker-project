import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const user = sessionStorage.getItem('accessToken');
  if (user) {
    return true;
  } else {
    return false;
  }
};

const PublicRoute = () => {
  const auth = useAuth();

  return auth ? <Navigate to="/dashboard/maindashboard" /> : <Outlet />;
};

export default PublicRoute;
