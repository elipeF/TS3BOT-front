import Axios from "axios";
import { newNotification } from "./NotificationsActions";

export const GET_CONFIG_START = "GET_CONFIG_START";
export const GET_CONFIG_SUCCESS = "GET_CONFIG_SUCCESS";
export const GET_CONFIG_FAIL = "GET_CONFIG_FAIL";

export const UPDATE_CONFIG_START = "UPDATE_CONFIG_START";
export const UPDATE_CONFIG_SUCCESS = "UPDATE_CONFIG_SUCCESS";
export const UPDATE_CONFIG_FAIL = "UPDATE_CONFIG_FAIL";

export const CHANGE_CONFIG_MODE = "CHANGE_CONFIG_MODE";


export const changeConfMode = (name, enabled) => (dispatch) => {
    Axios.post('/api/config/control', { name, enabled }).then(() => {
        dispatch(newNotification({
            type: "success",
            message: CHANGE_CONFIG_MODE
        }))
    }).catch((e) => {
        dispatch(newNotification({
            type: "error",
            message: e.response?.data.message
                ? e.response?.data.message
                : e.message,
        }))
    })
}


export const getConfig = (name) => (dispatch) => {
    dispatch({
        type: GET_CONFIG_START
    })
    Axios.get('/api/config/' + name).then(({ data }) => {
        dispatch(newNotification({
            type: "success",
            message: GET_CONFIG_SUCCESS
        }))
        dispatch({
            type: GET_CONFIG_SUCCESS,
            payload: { data, element: name }
        })
    }).catch((e) => {
        dispatch(newNotification({
            type: "error",
            message: e.response?.data.message
                ? e.response?.data.message
                : e.message,
        }))
        dispatch({
            type: GET_CONFIG_FAIL
        })
    })
}

export const updateConfig = (name, config) => (dispatch) => {
    dispatch({
        type: UPDATE_CONFIG_START
    })
    Axios.post('/api/config/' + name, { config }).then(() => {
        dispatch({ type: UPDATE_CONFIG_SUCCESS })
        dispatch(newNotification({
            type: "success",
            message: UPDATE_CONFIG_SUCCESS
        }))
        dispatch(getConfig(name))
    }).catch((e) => {
        dispatch({ type: UPDATE_CONFIG_FAIL })
        dispatch(newNotification({
            type: "error",
            message: e.response?.data.message
                ? e.response?.data.message
                : e.message,
        }))
    })
}