import { Route, Routes } from 'react-router-dom';
import ChatRoom from './pages/ChatRoom';
import Form from './pages/Form';
import NotFound from './pages/NotFound';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Form />}></Route>
            <Route path="/chat-room" element={<ChatRoom />}></Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
