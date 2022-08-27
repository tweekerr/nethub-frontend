import React, {FC} from 'react';
import classes from "./ВasicComps.module.scss"

interface IThemeTagProps {
  value: string
  onClick: (value: string) => void
}

const ThemeTag: FC<IThemeTagProps> = ({value, onClick}) => {
    const handleOnClick = () => onClick(value);

    return (
      <p onClick={handleOnClick} className={classes.themeTag}>
        #{value}
      </p>
    );
  }
;

export default ThemeTag;
