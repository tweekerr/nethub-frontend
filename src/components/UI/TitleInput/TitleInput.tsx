import React, {FC} from 'react';
import cl from './TitleInput.module.sass';
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
    </div>
  );
};

export default TitleInput;
