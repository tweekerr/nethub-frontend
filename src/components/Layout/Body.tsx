import React, {FC} from 'react';
import Menu from "./Menu/Menu";
import {ILayoutProps} from "./Layout";
import BarWrapper from "./BarWrapper";
import classes from './Layout.module.sass'
import {Box} from "@mui/material";


const Body: FC<ILayoutProps> = ({children, showSidebar = true, customSidebar, rightBar}) => {

  return (
    <div className={classes.bodyWrapper}>

      {/*left-bar*/}
      <BarWrapper className={classes.left}>
        {showSidebar &&
          (customSidebar ? customSidebar : <Menu/>)
        }
      </BarWrapper>

      {/*body-content*/}
      <Box className={classes.center}>
        {children}
      </Box>

      {/*side-bar*/}
      <BarWrapper className={classes.right}>
        {rightBar &&
          rightBar
        }
      </BarWrapper>

    </div>
  )
};

export default Body;
