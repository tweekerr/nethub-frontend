import React, {FC} from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import classes from '../ВasicComps.module.scss'

interface IBasicInputProps {
  placeholder: string,
  width: string,
  value: string,
  setValue: (value: string) => void
}

const BasicInput: FC<IBasicInputProps> = ({placeholder, width, value, setValue}) => {

  return (
    <Stack spacing={2} sx={{width: {width}}}>
      <Autocomplete
        options={[]}
        className={classes.BasicInput}
        size="small"
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        renderInput={(params) => (
          <TextField
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
            }}
            {...params}
            label={[placeholder]}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </Stack>
  );
}

export default BasicInput;
