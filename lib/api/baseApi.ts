// src/lib/api/baseApi.ts
import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

const rawBaseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4040',
    credentials: 'include', // Sends & receives HTTP-only cookies
});

// Custom wrapper for handling automatic 401 unauthenticated states
const baseQueryWithAuthGuard: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        if (typeof window !== 'undefined') {
            api.dispatch(baseApi.util.resetApiState());

            if (!window.location.pathname.startsWith('/login')) {
                window.location.href = `/login?expired=1&callbackUrl=${encodeURIComponent(
                    window.location.pathname,
                )}`;
            }
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithAuthGuard,
    tagTypes: ['User', 'Auth'],
    endpoints: () => ({}),
});