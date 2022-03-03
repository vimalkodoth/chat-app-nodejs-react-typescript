import React from 'react';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

global.fetch = require('jest-fetch-mock');
React.useLayoutEffect = React.useEffect;
configure({ adapter: new Adapter() });
