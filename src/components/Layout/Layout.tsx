import {Box} from '@mui/material';
import React, {FC, PropsWithChildren, ReactNode} from 'react';
import Header from './Header/Header';
import Body from "./Body";
import {useAppSelector} from "../../store";
import {Loader} from "../UI/loader/Loader";

export interface ILayoutProps extends PropsWithChildren {
  showSidebar?: boolean,
  customSidebar?: ReactNode,
  rightBar?: ReactNode
}

const Layout: FC<ILayoutProps> = ({children, showSidebar = true, customSidebar, rightBar}) => {
  const {loading, error} = useAppSelector((state) => state.generalReducer);

  return (
    <Box sx={{bgcolor: 'background.default'}}>
      <Header/>
      <Body showSidebar={showSidebar}
            customSidebar={customSidebar}
            rightBar={rightBar}
      >
        {loading
          ? <Loader/>
          : children
        }
      </Body>

      //Footer
    </Box>
  );
};

export default Layout;
