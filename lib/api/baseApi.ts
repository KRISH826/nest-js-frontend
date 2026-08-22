// src/lib/api/baseApi.ts
import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

const rawBaseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000',
    credentials: 'include', // Automatically passes and receives HttpOnly cookies
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();

    let result = await rawBaseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const requestUrl = typeof args === 'string' ? args : args.url;
        if (requestUrl.includes('/auth/refresh')) {
            return result;
        }

        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refreshResult = await rawBaseQuery(
                    { url: '/auth/refresh', method: 'POST' },
                    api,
                    extraOptions
                );

                if (refreshResult.data) {
                    // Retry initial request with fresh access_token cookie
                    result = await rawBaseQuery(args, api, extraOptions);
                } else {
                    // Refresh failed or revoked; purge state and force login
                    api.dispatch(baseApi.util.resetApiState());

                    if (typeof window !== 'undefined') {
                        const currentPath = window.location.pathname;
                        if (!currentPath.startsWith('/login')) {
                            window.location.href = `/login?expired=1&callbackUrl=${encodeURIComponent(
                                currentPath + window.location.search
                            )}`;
                        }
                    }
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await rawBaseQuery(args, api, extraOptions);
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User', 'Auth'],
    endpoints: () => ({}),
});