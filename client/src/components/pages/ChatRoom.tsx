import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useChatRoom from '../../hooks/useChatRoom';
import { RootState } from '../../redux/store';
import Chat from '../common/Chat';

function ChatRoom() {
    const { room, nickname } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const { user, sendChatMessage, usersInRoom, messages } = useChatRoom();

    useEffect(() => {
        if (!room || !nickname) {
            navigate('/');
        }
    }, []);

    if (!room || !nickname) return null;
    return (
        <Chat>
            <Chat.Sidebar>
                <Chat.Label header="Room" value={user.room} />
                <Chat.Label header="User" value={user.nickname} />
                <Chat.Users users={usersInRoom} />
            </Chat.Sidebar>
            <Chat.Main messages={messages}>
                {(messages) =>
                    !messages.length ? (
                        <div>No messages yet!</div>
                    ) : (
                        messages.map((message) => {
                            return message.type !== 'info' ? (
                                <Chat.UserMessage
                                    key={message.id}
                                    data={message}
                                />
                            ) : (
                                <Chat.InfoMessage
                                    key={message.id}
                                    data={message}
                                />
                            );
                        })
                    )
                }
            </Chat.Main>
            <Chat.Input onSelected={sendChatMessage} />
        </Chat>
    );
}

export default ChatRoom;
