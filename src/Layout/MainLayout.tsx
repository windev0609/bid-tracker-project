import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { RouterData } from '../RouterData';
import React from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Box, Drawer, AppBar, Toolbar, CssBaseline } from '@mui/material';
import '../Component/HeaderComponent/Header.scss';
import './MainLayout.scss';
import 'antd/dist/antd.css';
import BreadCrumbComponent from '../CustomComponent/BreadCrumbComponent';
import { userContext } from '../Context/userContext';
import { UserContextType } from '../TypeFile/TypeScriptType';
import Header from '../Component/HeaderComponent/Header';
const drawerWidth = 240;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}

const sidebarRoute = RouterData?.map((item: any) => {
  if (item.layout === '/dashboard') {
    if (!item.submenu) {
      return item.visibleInMenu ? getItem(item.name, item.key, item.icon) : null;
    } else {
      const submenu: any = [];
      item.menuItems.map((e: any) => {
        submenu.push(getItem(e.name, e.key, e.icon));
      });
      return getItem(item.name, item.key, item.icon, submenu);
    }
  } else {
    return null;
  }
});
const items: MenuProps['items'] = sidebarRoute;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hideSidebar } = React.useContext(userContext) as UserContextType;
  const onClick: MenuProps['onClick'] = (e) => {
    RouterData?.map((item) => {
      if (item.layout === '/dashboard') {
        if (!item.submenu) {
          if (item.key === e.key) {
            return navigate(item.layout + item.path);
          }
        } else {
          item.menuItems?.map((val) => {
            if (val.key === e.key) {
              return navigate(val.layout + val.path);
            }
          });
        }
      } else {
        return null;
      }
    });
  };
  const getRoutes = () => {
    return RouterData?.map((item, index: number) => {
      if (item.layout === '/dashboard') {
        if (!item.submenu) {
          return <Route key={index} path={item.layout + item.path} element={item.component} />;
        }
        if (item.submenu) {
          return item.menuItems?.map((e: any, value: number) => {
            return <Route key={value} path={e.layout + e.path} element={e.component} />;
          });
        }
      } else {
        return null;
      }
    });
  };
  const SideBarActiveMenu = () => {
    switch (location.pathname) {
      case '/dashboard/maindashboard': {
        return {
          defaultOpenKeys: ['sub1'],
          defaultSelectedKeys: ['Dashboard']
        };
      }
      case '/dashboard/appointment': {
        return {
          defaultOpenKeys: ['sub2'],
          defaultSelectedKeys: ['Appointment']
        };
      }
      case '/dashboard/taskboard': {
        return {
          defaultOpenKeys: ['sub3'],
          defaultSelectedKeys: ['Taskboard']
        };
      }
      case '/dashboard/doctors': {
        return {
          defaultOpenKeys: ['sub4'],
          defaultSelectedKeys: ['Doctors']
        };
      }
      case '/dashboard/AllPatients': {
        return {
          defaultOpenKeys: ['sub-patient1'],
          defaultSelectedKeys: ['All Patients']
        };
      }
      case '/dashboard/AllDoctor': {
        return {
          defaultOpenKeys: ['sub4', 'sub-doc1'],
          defaultSelectedKeys: ['All Doctor', 'Doctors']
        };
      }
      case '/dashboard/ViewDoctor': {
        return {
          defaultOpenKeys: ['sub4', 'sub-doc2'],
          defaultSelectedKeys: ['View Dcotor', 'Doctor']
        };
      }
      default: {
        return {
          defaultOpenKeys: [],
          defaultSelectedKeys: []
        };
      }
    }
  };
  const activeMenu = SideBarActiveMenu();
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ boxShadow: 'none !important', backgroundColor: '#fff !important' }}>
          <Header />
        </AppBar>
        {hideSidebar && (
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'none', lg: 'flex', xl: 'flex' },
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: 'border-box',
                background: '#f4f7f6 !important',
                borderRight: '0px',
                marginTop: '57px'
              }
            }}>
            <Menu
              onClick={onClick}
              style={{ width: '100%', background: '#f4f7f6' }}
              defaultSelectedKeys={activeMenu.defaultOpenKeys}
              defaultOpenKeys={activeMenu.defaultSelectedKeys}
              mode="inline"
              items={items}
            />
          </Drawer>
        )}

        <div
          className="offcanvas offcanvas-start"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          id="offcanvasScrolling"
          aria-labelledby="offcanvasScrollingLabel">
          <div className="offcanvas-body" data-bs-dismiss="offcanvas" aria-label="Close">
            <Menu
              onClick={onClick}
              style={{ width: '100%', background: '#f4f7f6' }}
              defaultSelectedKeys={activeMenu.defaultOpenKeys}
              defaultOpenKeys={activeMenu.defaultSelectedKeys}
              mode="inline"
              items={items}
            />
          </div>
        </div>
        <Box className="main--body">
          <Toolbar />
          <div className="d-flex">
            <BreadCrumbComponent pathname={location.pathname} />
          </div>
          <Routes>{getRoutes()}</Routes>
        </Box>
      </Box>
    </div>
  );
};

export default MainLayout;
