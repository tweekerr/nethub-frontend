import {useSnackbar, VariantType} from "notistack";


const useCustomSnackbar = (variant?: VariantType) => {
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
