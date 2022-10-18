import React, { useEffect, useState } from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers } from '../actions/userAction';

const UserListScreen = () => {
    const dispatch = useDispatch();
    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList;

    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch])
    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader/> 
            : error ? <Message variant='danger'>{error}</Message>
            : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                        <tbody>
                            
                        </tbody>
                    </thead>
                </Table>
            )}
        </>
    )
}

export default UserListScreen;