import { LOAD_NAV_ITEMS_FAIL, LOAD_NAV_ITEMS_START, LOAD_NAV_ITEMS_SUCCESS } from "../actions/NavigationActions";

const initialState = {
    items: {},
    loading: true,
};


const NavigationReducer = function (state = initialState, action) {
    switch (action.type) {
        case LOAD_NAV_ITEMS_SUCCESS:
            return {
                items: action.payload,
                loading: false,
            }
        case LOAD_NAV_ITEMS_FAIL:
            return {
                ...state,
                loading: false,
            }
        case LOAD_NAV_ITEMS_START:
            return {
                ...state,
                loading: true,
            }
        default:
            return {
                ...state
            }
    }
}


export default NavigationReducer;


