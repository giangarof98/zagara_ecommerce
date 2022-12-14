import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Button, Form, Row, Col, } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {login} from '../actions/userAction'

const LoginScreen = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const {loading, error, userInfo} = userLogin

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email,password))

    }

    return  (<FormContainer>
                <h1>Sign In</h1>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control   
                            type='email' 
                            placeholder='Enter email' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control   
                            type='password' 
                            placeholder='Enter password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary' className='my-3'>Log In</Button>
                </Form>
                <Row className='py-3'>
                    <Col>
                        New Costumer? {' '}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                    </Col>
                </Row>
            </FormContainer>)

}

export default LoginScreen