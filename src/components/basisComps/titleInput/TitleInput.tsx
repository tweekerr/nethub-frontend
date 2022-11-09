import React, {FC} from 'react';
import cl from '../ВasicComps.module.sass';
import {Input, InputProps, Text} from '@chakra-ui/react';

interface ITitleInputProps extends InputProps {
  title: string
}

const TitleInput: FC<ITitleInputProps> = (props) => {
  const {title, ...rest} = props;


  return (
    <div className={cl.titleInput}>
      <Text as={'p'}>{title}</Text>
      <Input{...rest}/>
      {/*<UiInput*/}
      {/*  disabled={disabled}*/}
      {/*helperText={helperText}*/}
      {/*placeholder={placeholder}*/}
      {/*width={width}*/}
      {/*value={value}*/}
      {/*setValue={setValue}*/}
      {/*type={type}*/}
      {/*rows={rows}*/}
      {/*/>*/}
    </div>
  );
};

export default TitleInput;
