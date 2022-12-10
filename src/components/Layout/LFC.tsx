import {FC, PropsWithChildren, ReactNode} from "react";
import {ErrorConfig} from "./ErrorBoundary";

export type LFC<T extends {} | undefined = undefined> = FC &
  {
    title?: FC<any>
    Left?: FC<any> & { config?: ISideBarConfig }
    Right?: FC<any> & { config?: ISectionConfig }
    config?: Omit<ISectionConfig, 'title'> & { showHeader?: boolean, showFooter?: boolean }
  }
  & (T extends undefined ? {} : { store: T })

export type LFC2 = () => {
  Left?: { render: JSX.Element, title?: ReactNode,  config?: ISideBarConfig },
  Center?: { render: JSX.Element, title?: ReactNode, config?: ISectionConfig },
  Right?: { render: JSX.Element, title?: ReactNode, config?: ISectionConfig },
  MainConfig?: { showHeader?: boolean, showFooter?: boolean },
  ContextProvider: FC<PropsWithChildren>
}

export interface ISectionConfig {
  error?: ErrorConfig
  authorized?: boolean
}

export interface ISideBarConfig extends ISectionConfig {
  showSidebar?: boolean
}

