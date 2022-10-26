import React, {FC} from 'react';
import UiInput, {IUiInputProps} from '../../UI/input/UiInput';
import classes from '../ВasicComps.module.sass';

interface ITitleInputProps extends IUiInputProps {
  title: string
  error?: boolean,
  helperText?: string
  disabled?: boolean,
}

const TitleInput: FC<ITitleInputProps> =
  ({
     title, placeholder, width, value, setValue,
     error, helperText, disabled,
     type, rows
   }) => {

    return (
      <div className={classes.titleInput}>
        <p>{title}</p>
        <UiInput
          disabled={disabled}
          error={error}
          helperText={helperText}
          placeholder={placeholder}
          width={width}
          value={value}
          setValue={setValue}
          type={type}
          rows={rows}
        />
      </div>
    );
  };

export default TitleInput;
