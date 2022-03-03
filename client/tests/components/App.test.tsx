import React from 'react';
import { shallow } from 'enzyme';
import App from '../../src/components/App';

describe('App', () => {
    it('should render app component', async () => {
        const wrapper = shallow(<App />);
        expect(wrapper.getElements()).toMatchSnapshot();
    });
});
