import axios from "axios";
import { CLEAR_ERRORS, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, NEW_PASSWORD_FAIL, NEW_PASSWORD_REQUEST, NEW_PASSWORD_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "../constants/userConstant"
import { CLEAR_CART } from "../constants/cartConstant";

// Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        });

        const { data } = await axios.post('/api/v1/users/login', {email, password}, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.data.user
        });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: "Login Failed",
        });
    }
};

// Register user
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_USER_REQUEST,
        });
        
        const { data } = await axios.post(`/api/v1/users/signup`, userData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.data.user,
        });

        return data.data.user;
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Load user action
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: LOAD_USER_REQUEST,
        });

        const { data } = await axios.get(`/api/v1/users/me`);
        
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// update user
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_PROFILE_REQUEST
        });

        const { data } = await axios.put('/api/v1/users/me/update', userData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        });

    }
}


// logout 
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/users/logout`);
        dispatch({
            type: LOGOUT_SUCCESS,
        });
        dispatch({
            type: CLEAR_CART,
        }); // clear cart when logout
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};

// update password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_PASSWORD_REQUEST
        });

        const { data } = await axios.put('/api/v1/users/password/update', passwords, {
            headers: {
                "Content-Type": "application/json"
            },
        });

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        });
    }
};


export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST,
        });

        const { data } = await axios.post('/api/v1/users/forgetPassword', email, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        });
    }
};

// reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_PASSWORD_REQUEST
        });

        const { data } = await axios.patch(`/api/v1/users/resetPassword/${token}`, passwords, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success
        });

    } catch (error) {
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.data.message
        }); 
    }
}