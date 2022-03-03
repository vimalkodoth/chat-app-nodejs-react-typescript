import { TMessage } from '../components/common/Chat';
import { v4 } from 'uuid';

export interface IMessageData {
    room: string;
    nickname: string;
    message: string;
}

/**
 *
 * @param {IMessageData}
 * @returns
 */
export function getMessageData({
    room,
    nickname,
    message,
}: Partial<TMessage>): TMessage {
    return {
        id: v4(),
        room,
        nickname,
        time: new Date().toUTCString(),
        message,
    } as TMessage;
}
