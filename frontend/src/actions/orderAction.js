import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_REQUEST
} from '../constants/orderConstants'

import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })
        
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        console.log(order)
        const {data} = await axios.post(`/api/order`, order, config)
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
        // dispatch({
        //     type: USER_LOGIN_SUCCESS,
        //     payload: data,
        // })

        //localStorage.setItem('userInfo', JSON.stringify(data))
        
    } catch(error){
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}