import React from 'react';
import { Breadcrumbs, Link, Menu, Typography } from '@mui/material';
import '../Component/HeaderComponent/Header.scss';
import { AiOutlineUser, AiOutlineHome } from 'react-icons/ai';
import { BiLeftArrowAlt } from 'react-icons/bi';
import '../Layout/MainLayout.scss';
import 'antd/dist/antd.css';
import Avatar from '@mui/material/Avatar';
import { userContext } from '../Context/userContext';
import { UserContextType } from '../TypeFile/TypeScriptType';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';

const BreadCrumbComponent: React.FC<{ pathname: string }> = ({ pathname }) => {
  const breadCrumbsPath = () => {
    switch (pathname) {
      case '/dashboard/maindashboard': {
        return {
          path: 'Dashboard',
          route: ['dashboard']
        };
      }
      case '/dashboard/appointment': {
        return {
          path: 'Book Appointment',
          route: ['appointment']
        };
      }
      case '/dashboard/taskboard': {
        return {
          path: 'Taskboard',
          route: ['taskboard']
        };
      }
      case '/dashboard/AllBids': {
        return {
          path: 'All Bids',
          route: ['Bid', 'AllBids']
        };
      }
      case '/dashboard/AllPatients': {
        return {
          path: 'All Patients',
          route: ['All Patients', 'Patients']
        };
      }
      case '/dashboard/viewPatients': {
        return {
          path: 'View Patients',
          route: ['View Patients', 'Patients']
        };
      }
      case '/dashboard/ViewDoctor': {
        return {
          path: 'View Doctor',
          route: ['View Doctor', 'Doctor']
        };
      }
      default:
        return {
          path: '',
          route: ['', '']
        };
    }
  };
  const bread = breadCrumbsPath();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const { MobileDrawer, hideSidebar } = React.useContext(userContext) as UserContextType;
  const handleSideBar = () => {
    MobileDrawer(!hideSidebar);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    navigate('/login');
    sessionStorage.clear();
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <div className="d-flex align-items-center gap-2">
            <div className="breadcrumb-icon">
              <BiLeftArrowAlt onClick={handleSideBar} />
            </div>
            <div className="breadcrumb-name">{bread.path}</div>
          </div>
          <div className="d-flex flex-column">
            <div>
              {/* <Breadcrumbs aria-label="breadcrumb">
                <Link href="/dashboard/maindashboard">
                  <AiOutlineHome className="bread-icon" />
                </Link>
                {bread?.route?.map((val: string, index: number) => {
                  return (
                    <div key={index}>
                      <Typography className="bread-name">{val}</Typography>
                    </div>
                  );
                })}
              </Breadcrumbs> */}
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 hidden--mobile">
          <div className="d-flex justify-content-end gap-4">
            <div>
              <Avatar
                alt="Remy Sharp"
                src=""
                sx={{ width: 35, height: 35, display: 'flex', justifyContent: 'bottom' }}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        {/* <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 hidden--mobile">
          <div className="d-flex justify-content-end gap-4">
            <div>
              <span className="chartBar">VISITORS</span>
              <div className="d-flex align-items-center gap-1">
                <span>
                  <AiOutlineUser className="chartBar-bar-icon" />
                </span>
                <span className="chartBar-bar-text">1,784</span>
              </div>
            </div>
            <div>
              <span className="chartBar">VISITS</span>
              <div className="d-flex align-items-center gap-1">
                <span>
                  <AiOutlineUser className="chartBar-bar-icon" />
                </span>
                <span className="chartBar-bar-text">1,784</span>
              </div>
            </div>
            <div>
              <span className="chartBar">CHATS</span>
              <div className="d-flex align-items-center gap-1">
                <span>
                  <AiOutlineUser className="chartBar-bar-icon" />
                </span>
                <span className="chartBar-bar-text">1,784</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default BreadCrumbComponent;
