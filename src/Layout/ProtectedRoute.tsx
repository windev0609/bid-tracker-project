import { Navigate, Outlet } from 'react-router-dom';
const useAuth = () => {
  const user = sessionStorage.getItem('accessToken');
  if (user) {
    return true;
  } else {
    return false;
  }
};

const ProtectedRoute = () => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />;
  // return <Outlet />;
};

export default ProtectedRoute;
