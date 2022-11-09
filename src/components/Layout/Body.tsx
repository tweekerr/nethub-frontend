import React, {FC, useEffect, useLayoutEffect, useRef, useState} from 'react';
import Menu from "./Menu/Menu";
import {ILayoutProps} from "./Layout";
import BarWrapper from "./BarWrapper";
import cl from './Layout.module.sass'
import {Box} from "@chakra-ui/react";
import AnimateHeight from 'react-animate-height';
import ErrorBlock from "../Article/Shared/ErrorBlock";
import ErrorBoundary from "./ErrorBoundary";


const Body: FC<Omit<ILayoutProps, 'showHeader' | 'showFooter'>> =
  ({children, sideBar, rightBar, title, error}) => {

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


    return (<Box flex={'1 1 auto'}>
        {/*titles*/}
        <AnimateHeight
          duration={700}
          height={titlesHeight}
          style={{marginTop: '7.5px', marginBottom: '7.5px'}}
        >
          <Box id='titles' ref={titlesRef} className={cl.bodyWrapper}>
            <Box className={cl.left}>
              {sideBar?.title ?? null}
            </Box>
            <Box className={cl.center}>
              {title ?? null}
            </Box>
            <Box className={cl.right}>
              {rightBar?.title ?? null}
            </Box>
          </Box>
        </AnimateHeight>

        <Box className={cl.bodyWrapper}>

          {/*left-bar*/}
          <BarWrapper className={cl.left}>
            <ErrorBoundary config={sideBar?.error}>
              {(sideBar?.showSidebar ?? true)
                ? (sideBar?.children ?? <Menu/>)
                : null
              }
            </ErrorBoundary>
          </BarWrapper>

          {/*body-content*/}
          <Box className={cl.center}>
            <ErrorBoundary config={error}>
              {children}
            </ErrorBoundary>
          </Box>

          {/*side-bar*/}
          <BarWrapper className={cl.right}>
            <ErrorBoundary config={rightBar?.error}>
              {rightBar?.children ?? null}
            </ErrorBoundary>
          </BarWrapper>

        </Box>
      </Box>
    )
  };

export default Body;
