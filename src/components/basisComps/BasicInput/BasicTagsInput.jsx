import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import classes from '../basicComps.module.scss';


const BasicTagsInput = ({placeholder, width, middleTags, setMiddleTags}) => {


    return (
        <div>
            <Stack spacing={2} sx={{width: {width}}}>
                <Autocomplete
                    className={classes.BasicInput}
                    size='small'
                    freeSolo
                    id='free-solo-2-demo'
                    disableClearable
                    options={inputHelp.map((option) => option.title)}
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
const inputHelp = [];
export default BasicTagsInput;
