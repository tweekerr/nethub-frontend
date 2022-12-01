import React, {FC, PropsWithChildren, ReactNode} from 'react';
import cl from "../ArticleInfo.module.sass"
import {Text, useColorModeValue} from "@chakra-ui/react";

interface IThemeTagProps extends PropsWithChildren {
  value: string,
  children?: ReactNode,
  onClick?: (value: string) => void
}

const Tag: FC<IThemeTagProps> = ({value, onClick, children}) => {
    const tagBg = useColorModeValue('#896DC8', '#835ADF');

    return (
      onClick ?
        <Text
          as={'p'} onClick={() => onClick(value)} className={cl.themeTag}
          bg={tagBg}
          display={'block'}
          height={'fit-content'}
        >
          {children ?? value}
        </Text>
        : <Text
          as={'p'} className={cl.themeTag}
          bg={tagBg}
          display={'block'}
          height={'fit-content'}
        >
          {children ?? value}
        </Text>
    );
  }
;

export default Tag;
