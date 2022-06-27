import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import classes from '../basicComps.module.scss'
import {useState} from "react";

export default function BasicInput({placeholder, width, value, setValue}) {

    return (
        <Stack spacing={2} sx={{ width: {width} }}>
            <Autocomplete
                className = {classes.BasicInput}
                size = "small"
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={inputHelp.map((option) => option.title)}
                renderInput={(params) => (
                    <TextField
                        value={value}
                        onChange={(e)=>{
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
const inputHelp = [];