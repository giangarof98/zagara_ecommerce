import { combineReducers} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import {productListReducer, productDetailsReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers';
import {userLoginReducer, userRegisterReducer} from './reducers/userReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,

});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

let initialState = {
    cartItems: cartItemsFromStorage,
    userLogin: userInfoFromStorage,
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