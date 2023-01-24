import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
    fontSize: 20
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '100%',
    height: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}));
interface FieldProps {
  label: string;
  name: string;
  type: string;
  onChange: () => void;
  error: string;
  helperText: string;
  test: string;
  value: string;
}

const InputComponent: React.FC<FieldProps> = (props) => {
  const { label, name, type, onChange, error, helperText, test, value, ...rest } = props;
  return (
    <div>
      <FormControl variant="standard">
        <InputLabel
          shrink
          htmlFor="bootstrap-input"
          sx={{ fontSize: '1.3rem', fontWeight: 'bolder' }}>
          {label}
        </InputLabel>
        <BootstrapInput
          id="bootstrap-input"
          name={name}
          type={type}
          value={value}
          inputProps={{ 'data-testid': name }}
          {...rest}
          onChange={onChange}
          sx={{ border: `${error ? '0px solid red' : ''}` }}
        />
      </FormControl>
      <span data-testid={test} style={{ color: 'red' }}>
        {helperText}
      </span>
    </div>
  );
};
export default InputComponent;
