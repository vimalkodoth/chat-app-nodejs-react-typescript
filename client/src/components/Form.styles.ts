/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const formCSS = css`
    display: flex;
    flex-direction: column;
    border: 1px solid #e0e0e0;
    padding: 1em;
`;

export const elemCSS = css`
    display: flex;
    flex-direction: column;
`;

export const fieldErrorCSS = css`
    color: red;
    margin: 0 1em;
    text-align: right;
    min-height: 1.2em;
`;

export const fieldCSS = css`
    display: flex;
    padding: 0.5em;
    input[type='text'],
    input[type='number'] {
        flex: 2;
    }
`;

export const labelCSS = css`
    flex: 0 1 6em;
`;

export const submitButtonCSS = css`
    align-self: center;
`;
