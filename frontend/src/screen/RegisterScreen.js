import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Button, Form, Row, Col, } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {register} from '../actions/userAction'

const RegisterScreen = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const {loading, error, userInfo} = userRegister

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password do not match')
        }else{
            dispatch(register(name,email,password))

        }

    }

    return  (<FormContainer>
                <h1>Sign Up</h1>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control   
                            type='name' 
                            placeholder='Enter your name' 
                            value={name}
                            onChange={(e) => setName(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
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
                    <Form.Group controlId='password'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control   
                            type='password' 
                            placeholder='Confirm password' 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary' className='my-3'>Create Account</Button>
                </Form>
                <Row className='py-3'>
                    <Col>
                        Already Have a Account? {' '}
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                    </Col>
                </Row>
            </FormContainer>)

}

export default RegisterScreen