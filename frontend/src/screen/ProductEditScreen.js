import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {listProductDetails, updateProduct} from '../actions/productAction'
import { Link } from 'react-router-dom';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

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
    const [uploading, setUploading ] = useState(false);

    const dispatch = useDispatch();
    
    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate);
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = productUpdate

    useEffect(() => {
        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            navigate(`/admin/productlist`)
        } else{
            if(!product.name || product._id !== productId){
                 dispatch(listProductDetails(productId))
     
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
                 
            }

        }
        
    }, [product, dispatch, productId, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            brand,
            category,
            description,
            image,
            countInStock

        }))

    }

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try{
            const config = {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)

        } catch(error){
            console.error(error)
            setUploading(false)
        }
    }

    return  (
            <>
                <Link to='/admin/productlist' className='btn btn-light my-3' >Go Back</Link>
                <FormContainer>
                    <h1>Edit Product</h1>
                    {loadingUpdate && <Loader/>}
                    {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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
                                <Form.Control
                                    type='file'
                                    // id='image-file' 
                                    label='choose file'
                                    custom='true'
                                    onChange={uploadFileHandler}>
                                </Form.Control>
                                {uploading && <Loader/>}
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