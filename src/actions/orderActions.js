import axios from "axios";
import { CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_PAYMENT_FAIL, CREATE_PAYMENT_REQUEST, MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../constants/orderConstant"

export const createOrder = (session_id) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_ORDER_REQUEST
        });

        const { data } = await axios.post('/api/v1/eats/orders/new', { session_id }, {
            headers: {
                "Content-Type": 'application/json'
            }
        });

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const payment = (items, restaurant) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_PAYMENT_REQUEST
        });

        const { data } = await axios.post('/api/v1/payment/process', { items, restaurant }, {
            headers: {
                "Content-Type": "application/json"
            },
        });

        if(data.url) {
            window.location.href = data.url;
        }
    } catch (error) {
        dispatch({
            type: CREATE_PAYMENT_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const myOrder = () => async (dispatch) => {
    try {
        dispatch({
            type: MY_ORDER_REQUEST
        });

        const { data } = await axios.get('/api/v1/eats/orders/me/myOrders');
        console.log("Order", data);
        
        dispatch({
            type: MY_ORDER_SUCCESS,
            payload: data.orders
        });

    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        });

        const { data } = await axios.get(`/api/v1/eats/orders/${id}`);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order,
        });

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};