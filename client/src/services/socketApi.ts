import { createApi } from '@reduxjs/toolkit/query/react';
import { connect, Socket } from 'socket.io-client';
import { TMessage } from '../components/Chat';
import { ChatEvent } from '../constants';

let client: Socket,
    connected = false;

function getSocket() {
    if (!client) {
        client = connect('ws://localhost:3001');
    }
    return client;
}

const connectSocket = () => {
    return new Promise<boolean>((resolve) => {
        const client = getSocket();
        if (connected) {
            resolve(connected);
            return;
        }
        client.on(ChatEvent.Connect, (data) => {
            connected = true;
            console.info(`Connected ${JSON.stringify(data)}`);
            resolve(connected);
        });
    });
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
        }>
    ) {
        const client = getSocket();
        await connectSocket();
        const { topic } = data;
        delete data.topic;
        if (topic) {
            client.emit(topic, data);
        }
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
                topic,
                { cacheEntryRemoved, updateCachedData, cacheDataLoaded }
            ) {
                await cacheDataLoaded;
                await connectSocket();
                const cb = (payload) => {
                    try {
                        updateCachedData((currentCacheData) => {
                            currentCacheData.messages.push(payload);
                        });
                    } catch {}
                };

                client.on(ChatEvent.ReceiveMessage, cb);
                await cacheEntryRemoved;
                client.off(ChatEvent.ReceiveMessage, cb);
            },
        }),
        getRoomUsers: builder.query<{ users: any[] }, void>({
            queryFn() {
                return { data: { users: [] } };
            },
            async onCacheEntryAdded(
                topic,
                { cacheEntryRemoved, updateCachedData, cacheDataLoaded }
            ) {
                await cacheDataLoaded;
                await connectSocket();
                const cb = (payload) => {
                    try {
                        updateCachedData((currentCacheData) => {
                            currentCacheData.users = payload.users;
                        });
                    } catch {}
                };

                client.on(ChatEvent.RoomUsers, cb);
                await cacheEntryRemoved;
                client.off(ChatEvent.RoomUsers, cb);
            },
        }),
    }),
});

export const {
    usePostMessageMutation,
    useGetMessageQuery,
    useGetRoomUsersQuery,
} = socketApi;
