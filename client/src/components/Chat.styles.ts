/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const Container = css`
    display: grid;
    grid-gap: 0.5em 0.5em;
    grid-template-columns: 1fr 2fr;
    grid-template-areas:
        'sidebar main main'
        'sidebar main main'
        'sidebar main main'
        'input input input';
    border: 1px solid #e0e0e0;
    padding: 1em;
    height: inherit;

    & > div {
        border: 1px solid #eee;
        border-radius: 0.2em;
        padding: 0.5em;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
    }
`;

export const Sidebar = css`
    grid-area: sidebar;
`;

export const Main = css`
    grid-area: main;
`;

export const Input = css`
    grid-area: input;
`;

export const Form = css`
    display: flex;
    flex-direction: row;
`;

export const MessageLabel = css`
    position: absolute;
    left: -9999px;
`;

export const InputContainer = css`
    min-width: 86%;
    input {
        width: 100%;
    }
`;

export const MessageMeta = css`
    font-size: 0.75rem;
    margin-top: 0.2em;
`;

export const InfoMessageMeta = css`
    font-size: 12px;
`;

export const InfoMessageContent = css`
    p {
        margin-bottom: 3px;
    }
`;
export const MessageContent = (isYou: boolean) => css`
    font-size: 1rem;
    background-color: #128c7e;
    ${!isYou &&
    `
        background-color: #34B7F1;
    `}
    color: #fff;
    padding: 0.5em;
    border-radius: 0.6em;
    p {
        margin: 0;
    }
`;

export const MessageContainer = (isYou: boolean) => css`
    max-width: 50%;
    p {
        margin: 5px 0;
    }
    align-self: flex-start;
    ${!isYou &&
    `
       align-self:flex-end;
    `}
`;

export const UsersHeaderStyles = css`
    border-bottom: 1px solid #eee;
`;
