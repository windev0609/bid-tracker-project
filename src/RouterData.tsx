import React from 'react';
import { GoHome } from 'react-icons/go';
import { AiOutlineUserAdd } from 'react-icons/ai';
const AllDoctor = React.lazy(() => import('./Component/Doctors/AllDoctor'));
const AllPatientsView = React.lazy(() => import('./Component/Patients/AllPatientsView'));
const MainDashboard = React.lazy(() => import('./Component/MainDashboard/MainDashboard'));
const ViewDoctor = React.lazy(() => import('./Component/Doctors/ViewDoctor'));
const ViewPatients = React.lazy(() => import('./Component/Patients/ViewPatients'));
const SignupPage = React.lazy(() => import('./Component/LoginComponent/SignupPage'));

import { BsChatLeftText, BsChatLeftTextFill } from 'react-icons/bs';

export const RouterData = [
  {
    path: '/',
    component: <SignupPage />,
    layout: '/',
    key: '',
    visibleInMenu: true,
    icon: null,
    name: '',
    submenu: false,
    menuItems: []
  },
  {
    name: 'Dashbaord',
    path: '/maindashboard',
    component: <MainDashboard />,
    submenu: false,
    layout: '/dashboard',
    key: 'sub1',
    visibleInMenu: true,
    icon: <GoHome />,
    menuItems: []
  },
  {
    path: '/viewPatients',
    name: 'All Patients',
    layout: '/dashboard',
    icon: <AiOutlineUserAdd />,
    key: 'sub-patient1',
    component: <ViewPatients />,
    visibleInMenu: false,
    menuItems: [],
    submenu: false
  },
  {
    path: '/ViewDoctor',
    name: 'View Doctor',
    layout: '/dashboard',
    icon: <AiOutlineUserAdd />,
    key: 'sub-doc2',
    component: <ViewDoctor />,
    visibleInMenu: false,
    menuItems: [],
    submenu: false
  },

  {
    name: 'Bid',
    path: '',
    layout: '/dashboard',
    component: null,
    submenu: true,
    key: 'sub4',
    icon: <BsChatLeftText />,
    menuItems: [
      {
        path: '/AllBids',
        name: 'All Bids',
        layout: '/dashboard',
        icon: <BsChatLeftTextFill />,
        key: 'sub-doc1',
        component: <AllDoctor />,
        visibleInMenu: true
      }
    ]
  }
];
