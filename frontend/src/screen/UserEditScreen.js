import React, { useEffect, useState } from 'react';
import {  useParams} from 'react-router-dom';
import {  } from 'react-router';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {getUserDetails} from '../actions/userAction'
import { Link } from 'react-router-dom';

const UserEditScreen = () => {
    //const navigate = useNavigate()
    //const location = useLocation()
    const userId = useParams().id;

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails

    useEffect(() => {
       if(!user.name || user._id !== userId){
            dispatch(getUserDetails(userId))

       } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.IsAdmin)
       }
    }, [user, dispatch, userId])

    const submitHandler = (e) => {
        e.preventDefault()


    }

    return  (
            <>
                <Link to='/admin/userlist' className='btn btn-light my-3' >Go Back</Link>
                <FormContainer>
                    <h1>Edit User</h1>
                    {loading ? <Loader/> : error ? 
                    <Message variant='danger'>{}</Message> 
                    : (
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
                            <Form.Group controlId='isadmin'>
                                <Form.Check   
                                    type='checkbox' 
                                    label='Is Admin' 
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}>
                                </Form.Check>
                            </Form.Group>
                            <Button type='submit' variant='primary' className='my-3'>Update</Button>
                        </Form>

                    )}
                </FormContainer>
            </>
    )
}

export default UserEditScreen