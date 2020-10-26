import Axios from "axios";

export const LOAD_NAV_ITEMS_START = "LOAD_NAV_ITEMS_START";
export const LOAD_NAV_ITEMS_SUCCESS = "LOAD_NAV_ITEMS_SUCCESS";
export const LOAD_NAV_ITEMS_FAIL = "LOAD_NAV_ITEMS_FAIL";


export const loadNavItems = () => (dispatch) => {
    dispatch({
        type: LOAD_NAV_ITEMS_START
    })
    Axios.get('/api/config/all').then(({ data }) => {
        dispatch({
            type: LOAD_NAV_ITEMS_SUCCESS,
            payload: data
        })
    }).catch((e) => {
        dispatch({
            type: LOAD_NAV_ITEMS_FAIL
        })
    })
}