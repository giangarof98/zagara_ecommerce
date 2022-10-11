import React, {useState} from "react";

//import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Button, Form, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartAction';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart
    if(!shippingAddress) {
        navigate('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                
                <Col>
                    <Form.Check 
                        type="radio" 
                        label='PayPal or Credit Cart' 
                        id='PayPal'
                        name="paymentMethod"
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                    </Form.Check>

                    {/* <Form.Check 
                        type="radio" 
                        label='Stripe' 
                        id='Stripe'
                        name="paymentMethod"
                        value='Stripe'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                    </Form.Check> */}
                </Col>

                </Form.Group>

                <Button className='my-3' type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen;