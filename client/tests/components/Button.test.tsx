import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../src/components/Button';

describe('Button', () => {
    it('should render component', async () => {
        const wrapper = shallow(<Button title="" />);
        expect(wrapper.getElements()).toMatchSnapshot();
    });
    it('should render a button', async () => {
        const wrapper = shallow(<Button title="button" />);
        expect(wrapper.find('button').exists()).toBeTruthy();
    });
});
