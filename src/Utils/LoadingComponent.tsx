import React from 'react';
import './CustomPatientDelete.scss';
import { Space, Spin } from 'antd';
const LoadingComponent = () => {
  return (
    <div className="loading--container">
      {' '}
      <Space size="middle" className="d-flex justify-content-center align-items-center">
        <Spin size="large" className="spinner" />
      </Space>
    </div>
  );
};

export default LoadingComponent;
