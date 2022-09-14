import {useState} from "react";

export type IValidator = (data: any) => boolean;

interface IItem {
  value: any,
  validators: IValidator[]
}

function useValidation() {
  const [items, setItems] = useState(Array<IItem>());


  function validate(data: any, validators: IValidator[], callbackOnInvalid?: () => void) {
    let isValid = true;
    if (validators.filter(v => !v(data)).length > 0) {
      isValid = false
      callbackOnInvalid && callbackOnInvalid()
    }
    return isValid;
  }

  return {validate}
}

class Validator{

}

export default useValidation;
