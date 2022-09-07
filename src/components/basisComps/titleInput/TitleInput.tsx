import React, {FC} from 'react';
import UiInput, {IUiInputProps} from '../../UI/input/UiInput';
import classes from '../ВasicComps.module.scss';

interface ITitleInputProps extends IUiInputProps {
  title: string
  error?: boolean,
  helperText?: string
}

const TitleInput: FC<ITitleInputProps> = ({title, placeholder, width, value, setValue, error, helperText}) => {

  return (
    <div className={classes.titleInput}>
      <p>{title}</p>
      <UiInput
        error={error}
        helperText={helperText}
        placeholder={placeholder}
        width={width}
        value={value}
        setValue={setValue}/>
    </div>
  );
};

export default TitleInput;
