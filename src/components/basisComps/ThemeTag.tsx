import React, {FC} from 'react';
import classes from "./ВasicComps.module.scss"

interface IThemeTagProps {
  tagLink: string,
  tagName: string
}

const ThemeTag: FC<IThemeTagProps> = ({tagLink, tagName}) => {
  return (
    <a href={tagLink} className={classes.themeTag}>
      #{tagName}
    </a>
  );
};

export default ThemeTag;
