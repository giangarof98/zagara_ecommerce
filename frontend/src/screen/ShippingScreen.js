import React, {useState} from 'react';

//import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartAction';

const ShippingScreen = () => {
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate(`/payment`)
    }
    return (
        <FormContainer>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control   
                        type='text' 
                        placeholder='Enter your address' 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control   
                        type='text' 
                        placeholder='Enter your city' 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control   
                        type='text' 
                        placeholder='Enter your Postal Code' 
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control   
                        type='text' 
                        placeholder='Enter your Country' 
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button className='my-3' type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
} 

export default ShippingScreen