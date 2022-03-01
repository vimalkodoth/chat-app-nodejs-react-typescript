import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    endpoints: (builder) => ({
        getUserIsValid: builder.query<object, any>({
            query: ({ room, nickname }) => `/users/${room}/${nickname}`,
        }),
    }),
});

export const { useLazyGetUserIsValidQuery } = usersApi;
