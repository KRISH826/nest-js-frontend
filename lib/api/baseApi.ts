import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4040',
        credentials: 'include', // Ensures HTTP-only cookies are received and sent
    }),
    tagTypes: ['User', 'Auth'],
    endpoints: () => ({}),
});