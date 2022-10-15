import React, {FC} from 'react';
import classes from "./ВasicComps.module.sass"

interface IThemeTagProps {
  value: string
  onClick?: (value: string) => void
}

const ThemeTag: FC<IThemeTagProps> = ({value, onClick}) => {

    return (
      onClick ?
        <p onClick={() => onClick(value)} className={classes.themeTag}>
          #{value}
        </p>
        : <p className={classes.themeTag}>
          #{value}
        </p>
    );
  }
;

export default ThemeTag;
