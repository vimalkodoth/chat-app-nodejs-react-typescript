import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type TRooms = string[];

export const roomsApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    endpoints: (builder) => ({
        getRooms: builder.query<{ rooms: TRooms }, void>({
            query: () => '/rooms',
        }),
    }),
});

export const { useGetRoomsQuery } = roomsApi;
