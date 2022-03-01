import { TMessage } from '../components/Chat';
import { v4 } from 'uuid';

export function getMessageData({
    room,
    nickname,
    message,
}: Partial<TMessage>): TMessage {
    return {
        id: v4(),
        room,
        nickname,
        time: `${new Date(Date.now()).getHours()}:${new Date(
            Date.now()
        ).getMinutes()}`,
        message,
    } as TMessage;
}
