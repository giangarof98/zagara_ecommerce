import React, { useEffect, useState } from 'react';
//import { useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Button, Form, Row, Col, } from 'react-bootstrap';
//import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {getUserDetails, getUserUpdate} from '../actions/userAction'
import { USER_UPDATE_RESET } from '../constants/userConstants';

const ProfileScreen = () => {
    const navigate = useNavigate()
    //const location = useLocation()
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    //const redirect = location.search ? location.search.split('=')[1] : '/';

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const {loading, error, user} = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const userUpdate = useSelector((state) => state.userUpdate);
    const {success} = userUpdate


    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        } else {
            if(!user.name || !user || success){
                dispatch({type: USER_UPDATE_RESET})
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [userInfo, dispatch, navigate, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password do not match')
        }else{
            dispatch(getUserUpdate({id: user._id, name, email, password}))

        }

    }

    return  (
            <Row>
                <Col md={3}>
                    <h2>User Profile</h2>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {success && <Message variant='success'>Information Updated!</Message>}
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
                        <Form.Group controlId='passwordConfirmation'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control   
                                type='password' 
                                placeholder='Confirm password' 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary' className='my-3'>Update</Button>
                    </Form>
                </Col>
                <Col md={9}>
                    <h2>My Orders</h2>
                </Col>
            </Row>
    )
}

export default ProfileScreen