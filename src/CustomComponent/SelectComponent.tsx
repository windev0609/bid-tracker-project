import React from 'react';
import { Select, MenuItem, InputBase, InputLabel } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: ''
  },

  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
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
const SelectInput = styled(Select)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow'])
  }
}));
interface CountryOption {
  id: string;
  key: string;
  data: string;
}

interface FieldProps {
  control: string;
  type: string;
  label: string;
  name: string;
  onChange: () => void;
  error: string;
  helperText: string;
  test: string;
  value: string;
  options: CountryOption[];
}

const SelectComponent: React.FC<FieldProps> = (props) => {
  const { options, label, error, helperText, name, test, value, ...rest } = props;
  console.log('lets see the ...rest:->', rest, rest.type);
  return (
    <>
      <InputLabel
        shrink
        htmlFor="bootstrap-input"
        {...rest}
        sx={{ display: 'flex', fontSize: '1.3rem', fontWeight: 'bolder' }}>
        {label}
      </InputLabel>
      <SelectInput
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        sx={{ width: '100%', border: `${error ? '1px solid red' : ''}` }}
        input={<BootstrapInput />}
        name={name}
        defaultValue=""
        inputProps={{ 'data-testid': name }}
        {...rest}
        value={value}>
        {options?.map((opt: CountryOption) => (
          <MenuItem value={opt.data} key={opt.id}>
            {opt.key}
          </MenuItem>
        ))}
      </SelectInput>
      <span data-testid={test} style={{ color: 'red' }}>
        {helperText}
      </span>
    </>
  );
};
export default SelectComponent;
