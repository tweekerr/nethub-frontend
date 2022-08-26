import React, {FC} from 'react';
import UiInput, {IUiInputProps} from '../../UI/input/UiInput';
import classes from '../ВasicComps.module.scss';

interface ITitleInputProps extends IUiInputProps {
  title: string
}

const TitleInput: FC<ITitleInputProps> = ({title, placeholder, width, value, setValue}) => {

  return (
    <div className={classes.titleInput}>
      <p>{title}</p>
      <UiInput placeholder={placeholder}
               width={width}
               value={value}
               setValue={setValue}/>
    </div>
  );
};

export default TitleInput;
