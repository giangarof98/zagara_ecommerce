import React, {useEffect} from 'react';
import {Link, useParams, useLocation} from 'react-router-dom'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message'
import {addToCart} from '../actions/cartAction'


const CartScreen = () => {
    const productId = useParams().id;
    const location = useLocation();
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    const {cartItems} = cart;
    console.log(cartItems);

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    return (
        <div>
            CART
        </div>
    )

}

export default CartScreen;