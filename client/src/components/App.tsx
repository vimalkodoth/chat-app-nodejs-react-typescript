/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/typed-hooks';
import { requestJSON } from '../redux/action';
import { AppCSS } from './App.styles';
import AppRoutes from './AppRoutes';

export type TRows = string | number | boolean;

const App = (): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { isLoading, isError } = useAppSelector((state) => state);
    // const dispatch = useAppDispatch();

    return (
        <div css={AppCSS}>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </div>
    );
};

export default App;
