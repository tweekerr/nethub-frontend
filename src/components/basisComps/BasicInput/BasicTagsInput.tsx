import React, {FC} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import classes from '../ВasicComps.module.scss';

interface IBasicInputProps {
  placeholder: string,
  width: string,
  middleTags: string,
  setMiddleTags: (value: string) => void
}

const BasicTagsInput: FC<IBasicInputProps> = ({placeholder, width, middleTags, setMiddleTags}) => {
  return (
    <div>
      <Stack spacing={2} sx={{width: {width}}}>
        <Autocomplete
          size='small'
          freeSolo
          id='free-solo-2-demo'
          disableClearable
          options={[]}
          renderInput={(params) => (
            <TextField
              value={middleTags}
              onChange={(e) => {
                setMiddleTags(e.target.value);
              }}
              {...params}
              label={[placeholder]}
              // color = "info"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
        />
      </Stack>
    </div>
  );
};

export default BasicTagsInput;
