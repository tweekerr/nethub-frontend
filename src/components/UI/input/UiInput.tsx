import React, {FC} from 'react';
import TextField from '@mui/material/TextField';

export interface IUiInputProps {
  placeholder: string,
  width: string,
  value: string | null,
  setValue: (value: string) => void
  helperText?: string
  error?: boolean
  disabled?: boolean,
  type?: 'input' | 'textarea',
  rows?: number,
}

const UiInput: FC<IUiInputProps> =
  ({
     placeholder, width,
     value, setValue, helperText = '',
     error = false, disabled = false,
     type, rows
   }) => {

    return (
      <TextField
        disabled={disabled}
        multiline={type === 'textarea'}
        rows={type === 'textarea' ? rows : 1}
        error={error}
        helperText={helperText}
        sx={{width: width, background: 'white'}}
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
