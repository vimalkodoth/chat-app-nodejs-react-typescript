/** @jsxImportSource @emotion/react */
import { BrowserRouter } from 'react-router-dom';
import { AppCSS } from './App.styles';
import AppRoutes from './AppRoutes';

export type TRows = string | number | boolean;

const App = (): JSX.Element => {
    return (
        <div css={AppCSS}>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </div>
    );
};

export default App;
