import React, {useState, useEffect} from "react";
import {PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {Link, useParams} from 'react-router-dom'
import { useNavigate } from 'react-router';
import { Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {getOrderDetails, payOrder, deliverOrder} from '../actions/orderAction';
import { ORDER_PAY_RESET, ORDER_DELIVERED_RESET } from "../constants/orderConstants";

import axios from "axios";

const OrderScreen = () => {
    const dispatch = useDispatch();
    const orderId = useParams().id;

    const [sdkReady, setSdkReady] = useState(false)
    const navigate = useNavigate();

    const orderDetails = useSelector((state) => state.orderDetails);
    const {order, loading, error} = orderDetails;


    const orderPay = useSelector((state) => state.orderPay);
    const {loading: loadingPay, success: successPay } = orderPay;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const {loading: loadingDeliver, success: successDeliver } = orderDeliver;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    if(!loading){
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc,item) => acc + item.price * item.qty, 0)
        )
    }

    //console.log(order.orderItems)
    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }
        const addPayPalScript = async () => {
            const {data: clientId} = await axios.get(`/api/config/paypal`)
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        
        if(!order || successPay || successDeliver || order._id !== orderId) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVERED_RESET})
            dispatch(getOrderDetails(orderId))
        } else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, successPay, order, userInfo, loadingDeliver, successDeliver, navigate])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
        
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? <Loader /> 
            : error ? <Message variant='danger'>{error}</Message>
            : <> 
                <h1>Order {order._id} </h1>
                <Row>
                    <Col lg={9} sm={12}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p><strong>Name: </strong>{userInfo.name}</p>
                                <p>Email: <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a></p>
                                <p>
                                    <strong>Address: </strong>
                                    {order.shippingAddress.address}, {''}
                                    {order.shippingAddress.city}, {''}
                                    {order.shippingAddress.postalCode}, {''}
                                    {order.shippingAddress.country} 
                                </p>
                                {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> 
                                    : <Message variant='danger'>Not delivered</Message>}
                                  
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    {order.paymentMethod} {''}
                                </p>
                                {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> 
                                    : <Message variant='danger'>Not paid</Message>}
                                    
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                    
                                    {order.orderItems.length === 0 
                                    ? (<Message>Your order is empty</Message> ): (
                                        <ListGroup variant="flush">
                                            {order.orderItems.map((item, index) =>(
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/ordert/${item.product}`}>{item.name}</Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty} x ${item.price} = ${item.qty * item.price}
                                                        </Col>
                                    
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                                    
                            </ListGroup.Item>

                        </ListGroup>
                    </Col>
                    <Col lg={3} sm={12}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>Order Sumary</h2>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${order.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${order.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>${order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                {!order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader />}
                                        {!sdkReady ? ( <Loader /> ) : (
                                            <PayPalScriptProvider>
                                                <PayPalButtons 
                                                    amount={order.totalPrice}
                                                    onSuccess={successPaymentHandler} 
                                                />
                                            </PayPalScriptProvider>
                                        )}

                                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                            <ListGroup.Item>
                                                <Button 
                                                    type="button"
                                                    className="btn btn-block"
                                                    onClick={deliverHandler}>
                                                        Mark as delivered
                                                </Button>
                                            </ListGroup.Item>
                                        )}
                                    </ListGroup.Item>
                                )}

                            </ListGroup>
                        </Card>                                 
                    </Col>
                </Row>
            </>
        
}

export default OrderScreen;