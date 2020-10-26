import { GET_CONFIG_FAIL, GET_CONFIG_START, GET_CONFIG_SUCCESS, UPDATE_CONFIG_FAIL, UPDATE_CONFIG_START, UPDATE_CONFIG_SUCCESS } from "../actions/ConfigActions";


const initialState = {
    data: [],
    loading: true,
    element: ''
};


const ConfigReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_CONFIG_SUCCESS:
            return {
                data: action.payload.data,
                element: action.payload.element,
                loading: false,
            }
        case GET_CONFIG_FAIL:
            return {
                ...state,
                element: '',
                loading: false,
            }
        case GET_CONFIG_START:
            return {
                ...state,
                element: '',
                loading: true,
            }
        case UPDATE_CONFIG_START:
            return {
                ...state,
                loading: true
            }
        case UPDATE_CONFIG_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case UPDATE_CONFIG_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return {
                ...state
            }
    }
}


export default ConfigReducer;


