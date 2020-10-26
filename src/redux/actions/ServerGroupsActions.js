import Axios from "axios";

export const GET_SERVER_GROUPS_START = "GET_SERVER_GROUPS_START";
export const GET_SERVER_GROUPS_SUCCESS = "GET_SERVER_GROUPS_SUCCESS";
export const GET_SERVER_GROUPS_FAIL = "GET_SERVER_GROUPS_FAIL";


export const getServerGroups = () => (dispatch) => {
    dispatch({
        type: GET_SERVER_GROUPS_START
    })
    Axios.get('/api/servergroups').then(({ data }) => {
        dispatch({
            type: GET_SERVER_GROUPS_SUCCESS,
            payload: data
        })
    }).catch((e) => {
        dispatch({
            type: GET_SERVER_GROUPS_FAIL
        })
    })
}