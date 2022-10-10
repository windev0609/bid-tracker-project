import React from 'react';
import InputComponent from './InputComponent';
import SelectComponent from './SelectComponent';
import { TextFieldProps } from '@mui/material';
import UploadComponent from './UploadComponent';

interface FieldProps {
  label: string;
  name: string;
  type: string;
  onChange: () => void;
  error: string;
  helperText: string;
  test: string;
  value: string;
  control: string;
}

const FormikControl: React.FC<FieldProps | TextFieldProps | any> = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case 'input':
      return <InputComponent {...rest} />;
    case 'select':
      return <SelectComponent {...rest} />;
    case 'upload':
      return <UploadComponent {...rest} />;
    default:
      return null;
  }
};
export default FormikControl;
