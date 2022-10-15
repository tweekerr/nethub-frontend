import React, {FC, useEffect, useLayoutEffect, useRef, useState} from 'react';
import Menu from "./Menu/Menu";
import {ILayoutProps} from "./Layout";
import BarWrapper from "./BarWrapper";
import cl from './Layout.module.sass'
import {Box} from "@mui/material";
import AnimateHeight from 'react-animate-height';


const Body: FC<Omit<ILayoutProps, 'showHeader' | 'showFooter'>> = ({children, showSidebar = true, customSidebar, rightBar, titles}) => {

    function getInitialHeight() {
      const storedHeight = localStorage.getItem('mainTitlesHeight');

      return storedHeight ? +storedHeight : 0;
    }

    const [titlesHeight, setTitleHeight] = useState<'auto' | number>(getInitialHeight());
    const titlesRef = useRef<HTMLDivElement>(null);


    useLayoutEffect(() => {
      const titlesHeight = titlesRef.current?.clientHeight;
      if (children !== undefined) {
        localStorage.setItem('mainTitlesHeight', titlesHeight!.toString());
        setTitleHeight(titlesHeight!);
      }
    }, [])


    return (<>
        {/*titles*/}
        <AnimateHeight
          duration={700}
          height={titlesHeight}
        >
          <div id='titles' ref={titlesRef} className={cl.bodyWrapper}>
            <Box className={cl.left}>
              {titles?.left && titles.left}
            </Box>
            <Box className={cl.center}>
              {titles?.center && titles.center}
            </Box>
            <Box className={cl.right}>
              {titles?.right && titles.right}
            </Box>
          </div>
        </AnimateHeight>

        <div className={cl.bodyWrapper}>

          {/*left-bar*/}
          <BarWrapper className={cl.left}>
            {showSidebar &&
              (customSidebar ? customSidebar : <Menu/>)
            }
          </BarWrapper>

          {/*body-content*/}
          <Box className={cl.center}>
            {children}
          </Box>

          {/*side-bar*/}
          <BarWrapper className={cl.right}>
            {rightBar &&
              rightBar
            }
          </BarWrapper>

        </div>
      </>

    )
  }
;

export default Body;
