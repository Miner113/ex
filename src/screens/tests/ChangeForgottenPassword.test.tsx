import { shallow } from 'enzyme';
import * as React from 'react';
import { ChangeForgottenPasswordScreen } from '../ChangeForgottenPasswordScreen';

describe('ChangeForgottenPasswordScreen test', () => {
    it('should render', () => {
        const wrapper = shallow(<ChangeForgottenPasswordScreen />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
