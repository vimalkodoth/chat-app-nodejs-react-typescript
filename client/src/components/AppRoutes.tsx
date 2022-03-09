import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Form = lazy(() => import('./pages/Form'));
const ChatRoom = lazy(() => import('./pages/ChatRoom'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AppRoutes = () => {
    return (
        <Suspense fallback={<h2>Loading ...</h2>}>
            <Routes>
                <Route path="/" element={<Form />} />
                <Route path="/chat-room" element={<ChatRoom />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
