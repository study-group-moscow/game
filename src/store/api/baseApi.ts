import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../../utils/consts';

export default createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${ENDPOINTS.HTTP}` }),
  endpoints: () => ({})
})
