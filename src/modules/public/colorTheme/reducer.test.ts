import * as actions from './actions';
import {
    changeColorThemeReducer,
    initialChangeColorThemeState,
} from './reducer';

describe('Change color theme reducer', () => {
    it('should handle CHANGE_COLOR_THEME', () => {
        let expectedState = {
            color: 'light',
        };
        expect(changeColorThemeReducer(initialChangeColorThemeState, actions.changeColorTheme('light'))).toEqual(expectedState);
        expect(localStorage.getItem('colorTheme')).toEqual('light');
        expectedState = {
            color: 'black',
        };
        expect(changeColorThemeReducer(initialChangeColorThemeState, actions.changeColorTheme('black'))).toEqual(expectedState);
        expect(localStorage.getItem('colorTheme')).toEqual('black');
    });
});
