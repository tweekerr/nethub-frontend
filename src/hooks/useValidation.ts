export type IValidator = (data: any) => boolean;

function useValidation() {

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

export default useValidation;
