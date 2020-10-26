import Axios from "axios";

export const GET_CHANNEL_GROUPS_START = "GET_CHANNEL_GROUPS_START";
export const GET_CHANNEL_GROUPS_SUCCESS = "GET_CHANNEL_GROUPS_SUCCESS";
export const GET_CHANNEL_GROUPS_FAIL = "GET_CHANNEL_GROUPS_FAIL";


export const getChannelGroups = () => (dispatch) => {
    dispatch({
        type: GET_CHANNEL_GROUPS_START
    })
    Axios.get('/api/channelgroups').then(({ data }) => {
        dispatch({
            type: GET_CHANNEL_GROUPS_SUCCESS,
            payload: data
        })
    }).catch((e) => {
        dispatch({
            type: GET_CHANNEL_GROUPS_FAIL
        })
    })
}