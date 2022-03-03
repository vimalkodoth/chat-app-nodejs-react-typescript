import { createApi } from '@reduxjs/toolkit/query/react';
import { connect, Socket } from 'socket.io-client';
import { TMessage } from '../components/common/Chat';
import { ChatEvent } from '../constants';

let socket: Socket | null = null;

export function disConnectSocket() {
    if (!socket) return null;
    socket.disconnect();
    socket = null;
    return null;
}

export const getSocket = () => {
    if (!socket) {
        socket = connect('ws://localhost:3001');
        console.log('connect called');
    }
    return socket;
};

export const socketApi = createApi({
    reducerPath: 'socketApi',
    async baseQuery(
        data: Partial<{
            topic: string;
            nickname: string;
            room: string;
            time: string;
            message: string;
            socket: Socket | null;
        }>
    ) {
        const { topic, ...restParams } = data;
        const socket = getSocket();
        topic && socket?.emit(topic, restParams);
        return { data: {} };
    },
    endpoints: (builder) => ({
        postMessage: builder.mutation<
            unknown,
            Partial<{
                message: string;
                topic: string;
                nickname: string;
                room: string;
                time: string;
                id: string;
            }>
        >({
            query({ message, topic, nickname, room, time, id }) {
                return { topic, nickname, room, time, message, id };
            },
            async onQueryStarted(patch, { dispatch, queryFulfilled }) {
                const { topic, ...message } = patch;
                if (topic !== ChatEvent.SendMessage) {
                    return;
                }
                const patchCollection = dispatch(
                    socketApi.util.updateQueryData(
                        'getMessage',
                        undefined,
                        (draft) => {
                            //redux-toolkit uses Immer internally for Immutability
                            draft.messages.push(message as TMessage);
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchCollection.undo();
                }
            },
        }),

        getMessage: builder.query<{ messages: TMessage[] }, void>({
            queryFn() {
                return { data: { messages: [] } };
            },
            async onCacheEntryAdded(
                args,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {
                await cacheDataLoaded;
                const socket = getSocket();
                console.log(socket);
                const cb = (payload) => {
                    try {
                        updateCachedData((currentCacheData) => {
                            //redux-toolkit uses Immer internally for Immutability
                            currentCacheData.messages.push(payload);
                        });
                    } catch {}
                };

                socket?.on(ChatEvent.ReceiveMessage, cb);
                await cacheEntryRemoved;
                socket?.off(ChatEvent.ReceiveMessage, cb);
                disConnectSocket();
            },
        }),
        getRoomUsers: builder.query<{ users: any[] }, void>({
            queryFn() {
                return { data: { users: [] } };
            },
            async onCacheEntryAdded(
                args,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {
                await cacheDataLoaded;
                const socket = getSocket();
                const cb = (payload) => {
                    try {
                        updateCachedData((currentCacheData) => {
                            currentCacheData.users = payload.users;
                        });
                    } catch {}
                };
                socket?.on(ChatEvent.RoomUsers, cb);
                await cacheEntryRemoved;
                socket?.off(ChatEvent.RoomUsers, cb);
                disConnectSocket();
            },
        }),
    }),
});

export const {
    usePostMessageMutation,
    useGetMessageQuery,
    useGetRoomUsersQuery,
} = socketApi;
