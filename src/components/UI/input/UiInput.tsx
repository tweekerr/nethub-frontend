import React, {FC} from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import classes from '../../basisComps/ВasicComps.module.scss'

export interface IUiInputProps {
  placeholder: string,
  width: string,
  value: string,
  setValue: (value: string) => void
}

const UiInput: FC<IUiInputProps> = ({placeholder, width, value, setValue}) => {

  return (
      <TextField
        sx={{width: width}}
        value={value ?? ''}
        size={'small'}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        label={[placeholder]}
      />
  );
}

export default UiInput;
