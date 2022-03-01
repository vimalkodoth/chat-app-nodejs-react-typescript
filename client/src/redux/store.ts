import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { roomsApi } from '../services/roomsApi';
import { socketApi } from '../services/socketApi';
import { usersApi } from '../services/usersApi';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        [socketApi.reducerPath]: socketApi.reducer,
        [roomsApi.reducerPath]: roomsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            socketApi.middleware,
            roomsApi.middleware,
            usersApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
