import {userApi} from "../api/api";

export const usernameDebounce = async (username: string | null, setErrors: any, errors: any, enqueueError: Function) => {
  if (username === null || username === '') {
    enqueueError('Невірно введене ім\'я користувача');
    setErrors({...errors, username: true});
    return false;
  }

  const isAvailable = await userApi.checkUsername(username);

  if (!isAvailable) {
    enqueueError('Ім\'я користувача вже використовується');
    setErrors({...errors, username: true});
    return false;
  }

  setErrors({...errors, username: false});
  return true;
}
