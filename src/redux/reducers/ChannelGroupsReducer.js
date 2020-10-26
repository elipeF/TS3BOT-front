import { GET_CHANNEL_GROUPS_FAIL, GET_CHANNEL_GROUPS_START, GET_CHANNEL_GROUPS_SUCCESS } from "../actions/ChannelGroupsActions";


const initialState = {
    items: [],
    loading: true,
};


const ChannelGroupsReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_CHANNEL_GROUPS_SUCCESS:
            return {
                items: action.payload,
                loading: false,
            }
        case GET_CHANNEL_GROUPS_FAIL:
            return {
                ...state,
                loading: false,
            }
        case GET_CHANNEL_GROUPS_START:
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


export default ChannelGroupsReducer;


