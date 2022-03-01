import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    nickname: string;
    room: string;
}

const initialState: UserState = {
    nickname: '',
    room: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.nickname = action.payload.nickname;
            state.room = action.payload.room;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
