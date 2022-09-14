import {useSnackbar} from "notistack";


const useCustomSnackbar = (variant?: 'error') => {
  const {enqueueSnackbar} = useSnackbar();

  function enqueueError(data: any) {
    enqueueSnackbar(data, {variant: 'error'})
  }

  function enqueueSnackBar(data: any) {
    enqueueSnackbar(data, {variant})
  }

  return {enqueueError, enqueueSnackBar}
}

export default useCustomSnackbar;
