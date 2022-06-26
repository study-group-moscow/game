import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../../constants/constants';

export default createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDPOINTS.HTTP}`,
    mode: 'cors',
    credentials: 'include'
  }),
  endpoints: () => ({})
})
