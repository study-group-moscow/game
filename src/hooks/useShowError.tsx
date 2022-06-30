import { useEffect } from 'react'
import type TErrorResponseRTK from 'src/models/TErrorResponseRTK'
import { IErrorResponse } from '../models/IErrorResponse'
import { IAlertTypeProps, showAlert } from '../store/reducers/AlertSlice'
import { MESSAGES_TEXT, TYPES_ALERT } from '../constants/constants'
import type { AppDispatch } from '../store/store';

interface IShowErrorProps {
  isError: boolean,
  error: TErrorResponseRTK,
  dispatch: AppDispatch
}

export default ({ isError, error, dispatch }: IShowErrorProps) => {
  useEffect(() => {
    if (isError) {
      const err = error as IErrorResponse

      dispatch(showAlert({
        text: err?.data?.reason ?? MESSAGES_TEXT.ERROR_OCCURRED,
        type: TYPES_ALERT.ERROR as IAlertTypeProps
      }))
    }
  }, [error])
}
