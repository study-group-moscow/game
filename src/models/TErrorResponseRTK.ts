import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'

export type TErrorResponseRTK = FetchBaseQueryError | SerializedError | undefined

