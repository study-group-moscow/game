import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../../utils/consts';

export const baseApi = createApi({
  reducerPath: 'api',
  tagTypes: ['Auth', 'User'],
  baseQuery: fetchBaseQuery({ baseUrl: `${ENDPOINTS.HTTP}` }),
  endpoints: () => ({})
})
