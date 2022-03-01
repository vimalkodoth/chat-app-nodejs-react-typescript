import { Route, Routes } from 'react-router-dom';
import { IData } from '../utils/dataService';
import ChatRoom from './ChatRoom';
import Form from './Form';
import NotFound from './NotFound';

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
