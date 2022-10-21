import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {listProductDetails} from '../actions/productAction'
import { Link } from 'react-router-dom';

const ProductEditScreen = () => {
    const navigate = useNavigate()
    //const location = useLocation()
    const productId = useParams().id;

    const [name,setName] = useState('');
    const [price,setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand,setBrand] = useState('');
    const [category,setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription ] = useState('');

    const dispatch = useDispatch();
    
    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails

    useEffect(() => {
            if(!product.name || product._id !== productId){
                 dispatch(listProductDetails(productId))
     
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.name)
                setBrand(product.name)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
                 
            }
        
    }, [product, dispatch, productId, navigate])

    const submitHandler = (e) => {
        e.preventDefault()

    }

    return  (
            <>
                <Link to='/admin/productlist' className='btn btn-light my-3' >Go Back</Link>
                <FormContainer>
                    <h1>Edit Product</h1>
                    {/* {loadingUpdate && <Loader/>}
                    {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} */}
                    {loading ? <Loader/> : error ? 
                    <Message variant='danger'>{}</Message> 
                    : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control   
                                    type='name' 
                                    placeholder='Enter products name' 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control   
                                    type='price' 
                                    placeholder='Enter Price' 
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control   
                                    type='text' 
                                    placeholder='Enter image url'
                                    value={image} 
                                    onChange={(e) => setImage(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='brand'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control   
                                    type='text' 
                                    placeholder='Enter Brand'
                                    value={brand} 
                                    onChange={(e) => setBrand(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control   
                                    type='text' 
                                    value={category} 
                                    placeholder='Enter category'
                                    onChange={(e) => setCategory(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='countInStock'>
                                <Form.Label>Count In Stock</Form.Label>
                                <Form.Control   
                                    type='text' 
                                    placeholder='Enter how many itemd do you have in stock'
                                    value={countInStock} 
                                    onChange={(e) => setCountInStock(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control   
                                    type='text' 
                                    placeholder='Enter description'
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                            <Button type='submit' variant='primary' className='my-3'>Update</Button>
                        </Form>

                    )}
                </FormContainer>
            </>
    )
}

export default ProductEditScreen