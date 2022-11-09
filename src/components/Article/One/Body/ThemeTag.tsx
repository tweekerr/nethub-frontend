import React, {FC} from 'react';
import cl from "../ArticleSpace.module.sass"
import {Text, useColorModeValue} from "@chakra-ui/react";

interface IThemeTagProps {
  value: string
  onClick?: (value: string) => void
}

const ThemeTag: FC<IThemeTagProps> = ({value, onClick}) => {
    const tagBg = useColorModeValue('#896DC8', '#835ADF');

    return (
      onClick ?
        <Text
          as={'p'} onClick={() => onClick(value)} className={cl.themeTag}
          bg={tagBg}  
        >
          #{value}
        </Text>
        : <Text as={'p'} className={cl.themeTag}>
          #{value}
        </Text>
    );
  }
;

export default ThemeTag;
