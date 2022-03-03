import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { TMessage } from '../components/Chat';
import { getMessageData } from '../utils/helpers';
import {
    connectSocket,
    disConnectSocket,
    socketApi,
    useGetMessageQuery,
    useGetRoomUsersQuery,
    usePostMessageMutation,
} from '../services/socketApi';
import { ChatEvent } from '../constants';
import { setUser, UserState } from '../redux/userSlice';
import { usersApi } from '../services/usersApi';

export default function useChatRoom() {
    const [postMessage] = usePostMessageMutation();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const messageResult = useGetMessageQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const usersResult = useGetRoomUsersQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        console.log(messageResult);
    }, [messageResult]);

    useEffect(() => {
        return () => {
            disConnectSocket();
            dispatch(setUser({} as UserState));
            dispatch(socketApi.util.resetApiState());
            dispatch(usersApi.util.resetApiState());
        };
    }, []);

    useEffect(() => {
        const { nickname, room } = user;
        if (nickname && room) {
            postMessage({
                topic: ChatEvent.JoinRoom,
                room,
                nickname,
            });
        }
    }, [user]);

    const sendChatMessage = async (message: string) => {
        const { nickname, room } = user;
        const messageData: TMessage = getMessageData({
            room,
            nickname,
            message,
        });
        postMessage({ topic: ChatEvent.SendMessage, ...messageData });
    };

    return {
        sendChatMessage,
        messages: messageResult.data?.messages ?? [],
        usersInRoom: usersResult.data?.users ?? [],
        user,
    };
}
