import React, {FC, useLayoutEffect, useRef, useState} from 'react';
import Menu from "./Menu/Menu";
import {ILayoutProps} from "./Layout";
import BarWrapper from "./BarWrapper";
import cl from './Layout.module.sass'
import {Box} from "@chakra-ui/react";
import AnimateHeight from 'react-animate-height';
import ErrorBoundary from "./ErrorBoundary";


const Body: FC<Omit<ILayoutProps, 'showHeader' | 'showFooter'>> =
  ({left, center, right}) => {

    function getInitialHeight() {
      const storedHeight = localStorage.getItem('mainTitlesHeight');

      return storedHeight ? +storedHeight : 0;
    }

    const [titlesHeight, setTitleHeight] = useState<'auto' | number>(getInitialHeight());
    const titlesRef = useRef<HTMLDivElement>(null);


    useLayoutEffect(() => {
      const titlesHeight = titlesRef.current?.clientHeight;
      if (center?.render !== undefined) {
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
              {left.title ?? null}
            </Box>
            <Box className={cl.center}>
              {center?.title ?? null}
            </Box>
            <Box className={cl.right}>
              {right?.title ?? null}
            </Box>
          </Box>
        </AnimateHeight>

        <Box className={cl.bodyWrapper}>

          {/*left-bar*/}
          <BarWrapper className={cl.left}>
            <ErrorBoundary config={left?.config?.error}>
              {(left?.config?.showSidebar ?? true)
                ? (left?.render ?? <Menu/>)
                : null
              }
            </ErrorBoundary>
          </BarWrapper>

          {/*body-content*/}
          <Box className={cl.center}>
            <ErrorBoundary config={center?.config?.error}>
              {center?.render}
            </ErrorBoundary>
          </Box>

          {/*sidebar*/}
          <BarWrapper className={cl.right}>
            <ErrorBoundary config={right?.config?.error}>
              {right?.render ?? null}
            </ErrorBoundary>
          </BarWrapper>

        </Box>
      </Box>
    )
  };

export default Body;
