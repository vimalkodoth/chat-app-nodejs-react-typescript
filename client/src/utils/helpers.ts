import { TMessage } from '../components/Chat';
import { v4 } from 'uuid';

export function getMessageData({
    room,
    nickname,
    message,
}: Partial<TMessage>): TMessage {
    const hours = new Date(Date.now()).getHours().toString();
    const minutes = new Date(Date.now()).getMinutes().toString();
    return {
        id: v4(),
        room,
        nickname,
        time: new Date().toUTCString(),
        message,
    } as TMessage;
}
