import React, {FC} from 'react';
import {Input} from '@chakra-ui/react';

export interface IUiInputProps{
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
      <Input
        disabled={disabled}
        isInvalid={error}
        placeholder={placeholder}
        value={value ?? ''}
        size={'small'}
        onChange={(e) => {
          setValue(e.target.value)
        }}
        // label={[placeholder]}
      />
    );
  }

export default UiInput;
