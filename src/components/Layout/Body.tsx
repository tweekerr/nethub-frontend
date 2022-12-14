import React, {FC, ReactElement, useLayoutEffect, useRef, useState} from 'react';
import Menu from "./Menu/Menu";
import BarWrapper from "./BarWrapper";
import cl from './Layout.module.sass'
import {Box} from "@chakra-ui/react";
import AnimateHeight from 'react-animate-height';
import ErrorBoundary from "./ErrorBoundary";
import {ISectionConfig, ISideBarConfig} from "./Layout";
import TitleEmpty from "./TitleEmpty";


export interface IBodyProps {
  Left?: ReactElement,
  Center: ReactElement,
  Right?: ReactElement,
  Titles?: { Left?: ReactElement, Center?: ReactElement, Right?: ReactElement },
  Config?: { Left?: ISideBarConfig, Center?: ISectionConfig, Right?: ISectionConfig }
}

const Body: FC<IBodyProps> =
  ({Left, Center, Right, Titles, Config}) => {

    function getInitialHeight() {
      const storedHeight = localStorage.getItem('mainTitlesHeight');

      return storedHeight ? +storedHeight : 0;
    }

    const [titlesHeight, setTitleHeight] = useState<'auto' | number>(getInitialHeight());
    const titlesRef = useRef<HTMLDivElement>(null);


    useLayoutEffect(() => {
      const titlesHeight = titlesRef.current?.clientHeight;

      if (Titles?.Center?.type !== TitleEmpty) {
        localStorage.setItem('mainTitlesHeight', titlesHeight!.toString());
        setTitleHeight(titlesHeight!);
      }
    }, [Titles?.Center])


    return <Box flex={'1 1 auto'}>
      {/*titles*/}
      <AnimateHeight
        duration={700}
        height={titlesHeight}
        style={{marginTop: '7.5px', marginBottom: '7.5px'}}
      >
        <Box id='titles' ref={titlesRef} className={cl.bodyWrapper}>
          <Box className={cl.left}>
            {Titles?.Left ?? null}
          </Box>
          <Box className={cl.center}>
            {Titles?.Center ?? null}
          </Box>
          <Box className={cl.right}>
            {Titles?.Right ?? null}
          </Box>
        </Box>
      </AnimateHeight>

      <Box className={cl.bodyWrapper}>

        {/*left-bar*/}
        <BarWrapper className={cl.left}>
          <ErrorBoundary show={Config?.Left?.showError}>
            {(Config?.Left?.showSidebar ?? true)
              ? (Left ?? <Menu/>)
              : null
            }
          </ErrorBoundary>
        </BarWrapper>

        {/*body-content*/}
        <Box className={cl.center}>
          <ErrorBoundary show={Config?.Center?.showError}>
            {Center}
          </ErrorBoundary>
        </Box>

        {/*sidebar*/}
        <BarWrapper className={cl.right}>
          <ErrorBoundary show={Config?.Right?.showError}>
            {Right}
          </ErrorBoundary>
        </BarWrapper>

      </Box>
    </Box>
  };

export default Body;
