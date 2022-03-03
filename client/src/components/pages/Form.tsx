import React, { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
    elemCSS,
    fieldCSS,
    fieldErrorCSS,
    formCSS,
    formWrapper,
    submitButtonCSS,
    labelCSS,
} from './Form.styles';

import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { useGetRoomsQuery } from '../../services/roomsApi';
import { useLazyGetUserIsValidQuery } from '../../services/usersApi';

const Form = (): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [
        triggerGetUserIsValid,
        { isSuccess: isGetUserIsValid, error: isGetUserIsValidError },
    ] = useLazyGetUserIsValidQuery();
    const {
        data: chatRoomsData,
        error,
        isLoading,
        isSuccess,
    } = useGetRoomsQuery();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        dispatch(setUser(data));
        triggerGetUserIsValid(data);
    };

    useEffect(() => {
        if (isGetUserIsValidError) {
            alert('An error has occured. Please provide a different nickname.');
        } else if (isGetUserIsValid) {
            navigate('/chat-room');
        }
    }, [isGetUserIsValid, isGetUserIsValidError]);

    return (
        <>
            {isLoading && <h2>Loading ...</h2>}
            {error && <h2>Something went wrong ...</h2>}
            {isSuccess && (
                <div css={formWrapper}>
                    <form css={formCSS} onSubmit={handleSubmit(onSubmit)}>
                        <div css={elemCSS}>
                            <div css={fieldCSS}>
                                <label htmlFor="user_id" css={labelCSS}>
                                    Nick Name
                                </label>
                                <input
                                    id="user_id"
                                    type="text"
                                    {...register('nickname', {
                                        required: true,
                                    })}
                                />
                            </div>
                            {errors.nickname && (
                                <p css={fieldErrorCSS}>
                                    Please enter the Nickname
                                </p>
                            )}
                        </div>
                        <div css={elemCSS}>
                            <div css={fieldCSS}>
                                <label htmlFor="price_range" css={labelCSS}>
                                    Chat Room
                                </label>
                                <select
                                    id="price_range"
                                    {...register('room', {
                                        required: true,
                                    })}
                                >
                                    {chatRoomsData?.rooms?.map((room) => (
                                        <option value={room} key={room}>
                                            {room}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {errors.room && (
                                <p css={fieldErrorCSS}>
                                    Select a valid chat room
                                </p>
                            )}
                        </div>
                        <input
                            css={submitButtonCSS}
                            type="submit"
                            value="Join Chat!"
                            id="submit"
                        />
                    </form>
                </div>
            )}
        </>
    );
};

export default Form;
