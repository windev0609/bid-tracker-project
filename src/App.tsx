import './App.css';
import MainRoutes from './Layout/MainRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProvider from './Context/userContext';
function App() {
  return (
    <UserProvider>
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ToastContainer />
        <MainRoutes />
      </div>
    </UserProvider>
  );
}
export default App;
