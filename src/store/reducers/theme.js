import { CHANGE_THEME } from "../actions/actionTypes";

const initialState = {
    theme: true  // true - light , false - dark
}

export default function changeTheme(state = initialState, action) {
    switch (action.type) {
        case CHANGE_THEME:
            return {
                theme: !state.theme
            }
        default:
            return state
    }
}