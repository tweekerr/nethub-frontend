import {useState} from "react";

export interface IError {
  isError: boolean,
  message?: string
}

export default function useLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setHookError] = useState<IError>({isError: false});

  function setError(flag: boolean, message?: string) {
    setHookError({isError: flag, message});
  }

  return {
    isLoading,
    startLoading: () => setIsLoading(true),
    finishLoading: () => setIsLoading(false),
    error,
    setError
  }
}
