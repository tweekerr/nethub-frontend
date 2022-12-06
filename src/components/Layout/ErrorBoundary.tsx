import React, {Component, ReactNode} from 'react';
import ErrorBlock from "./ErrorBlock";
import {ApiError} from "../../types/ApiError";

export type ErrorConfig = {
  show?: boolean,
  customMessage?: string,
  showThrewMessage?: boolean
  processError?: (e: Error | ApiError) => string
}

interface Props {
  children?: ReactNode;
  config?: ErrorConfig
}

interface State {
  isError: boolean;
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    isError: false,
  };

  private isTest: boolean = import.meta.env.REACT_APP_IS_DEVELOPMENT === 'false'

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return {isError: true, error: _};
  }

  render() {

    if (this.state.isError) {
      return this.props.config?.show ?
        (this.props.config?.showThrewMessage ?? this.isTest)
          ? <ErrorBlock>{this.state.error?.message}</ErrorBlock>
          : this.props.config?.customMessage
            ? <ErrorBlock>{this.props.config.customMessage}</ErrorBlock>
            : !!this.props.config.processError
              ? <ErrorBlock>{this.props.config.processError(this.state.error!)}</ErrorBlock>
              : <ErrorBlock/>
        : <></>
    }


    return this.props.children;
  }
}

export default ErrorBoundary;
