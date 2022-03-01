/** @jsxImportSource @emotion/react */
import {
    Container,
    Form,
    Input,
    InputContainer,
    Main,
    MessageContainer,
    MessageContent,
    MessageLabel,
    MessageMeta,
    Sidebar,
    UsersHeaderStyles,
} from './Chat.styles';
import { useForm } from 'react-hook-form';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

export default function Chat({ children, ...resetProps }) {
    return (
        <div css={Container} {...resetProps}>
            {children}
        </div>
    );
}

Chat.Sidebar = function ChatSidebar({ children, ...resetProps }) {
    return <div css={Sidebar}>{children}</div>;
};

Chat.Main = function ChatMain({ children, messages }) {
    return <div css={Main}>{children(messages)}</div>;
};

export type TMessage = {
    room: string;
    nickname: string;
    time: string;
    message: string;
};
Chat.Input = function ChatInput({ onSelected }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        const { message } = data;
        onSelected(message);
        reset({ message: '' });
    };

    return (
        <div css={Input}>
            <form css={Form} onSubmit={handleSubmit(onSubmit)}>
                <div css={InputContainer}>
                    <input
                        aria-label="message input"
                        id="message"
                        type="text"
                        {...register('message', {
                            required: true,
                        })}
                    />
                </div>
                <input type="submit" value="SEND" id="submit" />
            </form>
        </div>
    );
};

Chat.Label = function ChatDisplayName({
    header,
    value,
}: {
    header: string;
    value: string;
}) {
    return (
        <div>
            <h4 css={UsersHeaderStyles}>{header}</h4>
            <p>{value}</p>
        </div>
    );
};

Chat.User = function ChatUser() {
    const nickname = useSelector((state: RootState) => state.user.nickname);
    return (
        <div>
            <h4 css={UsersHeaderStyles}>User</h4>
            <p>{nickname}</p>
        </div>
    );
};

Chat.Users = function ChatUsers({ users }) {
    return (
        <>
            <h4 css={UsersHeaderStyles}>Online</h4>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.nickname}</li>
                ))}
            </ul>
        </>
    );
};

Chat.UserMessage = function ChatUserMessage({ data }) {
    const nickname = useSelector((state: RootState) => state.user.nickname);
    const isYou = nickname === data.nickname;
    return (
        <div css={MessageContainer(isYou)}>
            <div css={MessageContent(isYou)}>
                <p>{data.message}</p>
            </div>
            <div css={MessageMeta}>
                <p>
                    {data.time} | {data.nickname}
                </p>
            </div>
        </div>
    );
};

Chat.InfoMessage = function ChatInfoMessage({ data }) {
    return (
        <div>
            <div>
                <p>{data.message}</p>
            </div>
            <div css={MessageMeta}>
                <p>{data.time}</p>
            </div>
        </div>
    );
};
