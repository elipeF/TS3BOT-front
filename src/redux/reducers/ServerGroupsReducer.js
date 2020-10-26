import { GET_SERVER_GROUPS_FAIL, GET_SERVER_GROUPS_START, GET_SERVER_GROUPS_SUCCESS } from "../actions/ServerGroupsActions";

const initialState = {
    items: [],
    loading: true,
};


const ServerGroupsReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_SERVER_GROUPS_SUCCESS:
            return {
                items: action.payload,
                loading: false,
            }
        case GET_SERVER_GROUPS_FAIL:
            return {
                ...state,
                loading: false,
            }
        case GET_SERVER_GROUPS_START:
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


export default ServerGroupsReducer;


