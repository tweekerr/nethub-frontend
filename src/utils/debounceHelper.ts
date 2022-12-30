import {userApi} from "../api/api";

export const usernameDebounce = async (username: string | null, setErrors: any, errors: any, enqueueError: Function) => {
  if (username === null || username === '') {

    // enqueueError('Невірно введене ім\'я користувача');
    setErrors({
      ...errors,
      username: {_errors: ['Невірно введене ім\'я користувача']}
    });
    // setErrors({...errors, username: true});
    return false;
  }

  const isAvailable = await userApi.checkUsername(username);

  if (!isAvailable) {
    // enqueueError();
    setErrors({...errors, username: {_errors: ['Ім\'я користувача вже використовується']}});
    return false;
  }

  setErrors({...errors, username: undefined});
  return true;
}
