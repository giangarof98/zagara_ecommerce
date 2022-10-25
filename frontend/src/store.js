import { combineReducers} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';

import {
    productListReducer, 
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productCreateReviewReducer,
    productTopReducer
} from './reducers/productReducers';

import { cartReducer } from './reducers/cartReducers';

import {
    userDetailsReducer, 
    userLoginReducer, 
    userRegisterReducer, 
    userUpdateReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateAdminReducer,

} from './reducers/userReducers';

import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    getMyOrderListReducer,
    getAllOrdersReducer,
    orderDeliverReducer
} from './reducers/orderCreateReducer';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReview: productCreateReviewReducer,
    productTop: productTopReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdateAdmin: userUpdateAdminReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderMyList: getMyOrderListReducer,
    orderList: getAllOrdersReducer

});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};

let initialState = {
    //cartItems: cartItemsFromStorage,
    cart: { 
        cartItems: cartItemsFromStorage, 
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: {userInfo: userInfoFromStorage},
};

//const middleware = [thunk];

const store = configureStore({
    reducer,
    initialState,
    preloadedState: {},
    //composeWithDevTools(applyMiddleware(...middleware))
    middleware: [thunk]
})

export default store;