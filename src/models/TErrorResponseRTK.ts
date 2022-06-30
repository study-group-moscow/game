import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'

type TErrorResponseRTK = FetchBaseQueryError | SerializedError | undefined

export default TErrorResponseRTK
