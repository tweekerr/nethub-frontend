import {Dispatch, SetStateAction, useState} from "react";

export type IValidator = (data: any) => boolean | Promise<boolean>;

interface IItem<TErrorType> {
  value: any,
  field: keyof TErrorType,
  validators: IValidator[],
  message?: string,
  success?: () => void,
  error?: () => void,
}

export default function useValidator<TErrorType>() {
  const [errors, setHookErrors] = useState<TErrorType>({} as TErrorType);
  const [items, setItems] = useState(Array<IItem<TErrorType>>());

  const validator = new Validator<TErrorType>(errors, items, setHookErrors);

  return {addValidator: validator.addItem, validateAll: validator.validateAll, errors, setErrors: setHookErrors};
}

class Validator<TErrorType> {
  private readonly _errors: TErrorType;
  private readonly _items: Array<IItem<TErrorType>>;
  private readonly _setErrors: Dispatch<SetStateAction<TErrorType>>

  constructor(errors: TErrorType,
              items: Array<IItem<TErrorType>>,
              setErrors: Dispatch<SetStateAction<TErrorType>>) {
    this.addItem = this.addItem.bind(this);
    this.validateAll = this.validateAll.bind(this);

    this._errors = errors;
    this._items = items;
    this._setErrors = setErrors;
  }

  public addItem(item: IItem<TErrorType>) {
    const itemIndex = this._items.findIndex(i => i.field == item.field);
    if (itemIndex !== -1) {
      this._items[itemIndex].value = item.value;
      return;
    }
    this._items.push(item)
  }

  async validateAll() {
    let localErrors = {} as TErrorType;
    let localErrorMessages = [] as string[];

    for (const item of this._items) {
      for (const validator of item.validators) {
        localErrors = {...localErrors, [item.field]: false}

        const promise = validator(item.value);
        let isSuccess;
        if (promise
          && typeof (promise as Promise<boolean>).then === 'function'
          && (promise as Promise<boolean>)[Symbol.toStringTag] === 'Promise') {
          isSuccess = await promise;
        } else {
          isSuccess = promise as boolean
        }


        if (!isSuccess) {
          localErrors = {...localErrors, [item.field]: true}
          item.message && localErrorMessages.push(item.message)
          item.error && item.error();
          continue;
        }
        item.success && item.success();
      }
    }

    // this._items.forEach((item) => {
    //   item.validators.forEach(async (validator) => {
    //     localErrors = {...localErrors, [item.field]: false}
    //
    //     const promise = validator(item.value);
    //     let isSuccess;
    //     if (promise
    //       && typeof (promise as Promise<boolean>).then === 'function'
    //       && (promise as Promise<boolean>)[Symbol.toStringTag] === 'Promise') {
    //
    //       isSuccess = await promise;
    //
    //     } else {
    //       //direct
    //     }
    //
    //
    //     if (!isSuccess) {
    //       localErrors = {...localErrors, [item.field]: true}
    //       item.message && localErrorMessages.push(item.message)
    //       item.error && item.error();
    //       return;
    //     }
    //     item.success && item.success();
    //   })
    // })

    this._setErrors(localErrors);

    return {isSuccess: Object.values(localErrors).every(e => e === false), errors: localErrorMessages};
  }
}
