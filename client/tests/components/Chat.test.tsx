import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { act } from 'react-dom/test-utils';
import * as redux from 'react-redux';
import Chat from '../../src/components/common/Chat';

const testUser = 'testUser';
const spy = jest.spyOn(redux, 'useSelector');
spy.mockReturnValue({ nickname: 'testUser' });

describe('Chat', () => {
    it('should render Chat component', async () => {
        const wrapper = shallow(<Chat></Chat>);
        expect(wrapper.getElements()).toMatchSnapshot();
    });
    it('should render ChatSidebar component', async () => {
        const wrapper = shallow(<Chat.Sidebar></Chat.Sidebar>);
        expect(wrapper.getElements()).toMatchSnapshot();
    });
    it('should render ChatMain component', async () => {
        const wrapper = shallow(<Chat.Main></Chat.Main>);
        expect(wrapper.getElements()).toMatchSnapshot();
    });
    it('should render ChatLabel component', async () => {
        const wrapper = shallow(
            <Chat.Label header="header" value="value"></Chat.Label>
        );
        expect(wrapper.getElements()).toMatchSnapshot();
    });
    it('should render ChatUser component', async () => {
        const wrapper = shallow(<Chat.User />);
        expect(wrapper.getElements()).toMatchSnapshot();
    });
    it('should render ChatUsers component', async () => {
        const wrapper = shallow(
            <Chat.Users users={[{ id: 'id-0', nickname: testUser }]} />
        );
        expect(wrapper.getElements()).toMatchSnapshot();
    });
    it('should render ChatUserMessage component', async () => {
        const wrapper = shallow(
            <Chat.UserMessage
                data={{
                    time: new Date().toUTCString(),
                    message: 'hello!',
                    nickname: testUser,
                }}
            />
        );
        expect(wrapper.getElements()).toMatchSnapshot();
    });
    it('should render ChatUserMessage component', async () => {
        const wrapper = shallow(
            <Chat.InfoMessage
                data={{ time: new Date().toUTCString(), message: 'hello!' }}
            />
        );
        expect(wrapper.getElements()).toMatchSnapshot();
    });
    it('should render ChatInput component', async () => {
        const onSelected = jest.fn();
        const rendered = mount(<Chat.Input onSelected={onSelected} />);

        await act(async () => {
            rendered.find('input[id="message"]').instance().value =
                'Hey, a message';
            rendered.find('input[id="message"]').simulate('change');
            rendered.find('form').simulate('submit');
        });
        expect(rendered.getElements()).toMatchSnapshot();
        expect(onSelected).toHaveBeenCalled();
    });
});
