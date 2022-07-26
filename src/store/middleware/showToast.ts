import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'

import { IAlertTypeProps, showAlert } from '../reducers/AlertSlice'
import { MESSAGES_TEXT, TYPES_ALERT } from '../../constants/constants'

/**
 * middleware отображает сообщение с ошибкой пришедшей от сервера
 */
const showToast: Middleware = ({ dispatch }: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    dispatch(showAlert({
      text: action.payload.data.reason ?? MESSAGES_TEXT.ERROR_OCCURRED,
      type: TYPES_ALERT.ERROR as IAlertTypeProps
    }))
  }

  return next(action);
}

export default showToast
