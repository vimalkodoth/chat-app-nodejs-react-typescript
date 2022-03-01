import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { TMessage } from '../components/Chat';
import { getMessageData } from '../utils/helpers';
import {
    useGetMessageQuery,
    useGetRoomUsersQuery,
    usePostMessageMutation,
} from '../services/socketApi';
import { ChatEvent } from '../constants';

export default function useChatRoom() {
    const [postMessage] = usePostMessageMutation();
    const messageResult = useGetMessageQuery();
    const usersResult = useGetRoomUsersQuery();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const { nickname, room } = user;
        if (nickname && room) {
            postMessage({ topic: ChatEvent.JoinRoom, room, nickname });
        }
    }, [user, postMessage]);

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
