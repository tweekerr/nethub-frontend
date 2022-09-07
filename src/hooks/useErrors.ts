import {useState} from "react";

function useErrors<TErrorType>() {
  const [errors, setHookErrors] = useState<TErrorType>({} as TErrorType);

  function setErrors(key: keyof TErrorType, value: any) {
    setHookErrors(prevState => {
      return {...prevState, [key]: value}
    })
  }

  return {errors, setErrors}
}

export default useErrors;
