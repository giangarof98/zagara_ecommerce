import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import { useNavigate } from "react-router";
import {useDispatch, useSelector} from 'react-redux'
import {Col,Row,Image,ListGroup,Card,Button,Form} from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {listProductDetails, createReview} from '../actions/productAction'
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = () => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const {id} = useParams();
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin;

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails;

    const productReview = useSelector(state => state.productReview)
    const {success:successReview, error:errorReview} = productReview;

    const navigate = useNavigate();

    useEffect(() => {
        if(successReview){
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(id))

    },[dispatch,id, successReview])

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createReview(id, {rating, comment} ))
    }
    
    return (
        <>
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
            {loading ? (
                <Loader/>
                ) : error ?(
                <Message variant='danger'>{error}</Message>
                ) : (
                <>
                    <Row>
                        <Col lg={6} sm={12}>
                            <Image src={product.image} alt={product.name} fluid/>
                        </Col>
                        <Col lg={6} sm={12}>
                            <ListGroup variant="flush">
                                <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} Reviews`}/>
                                </ListGroup.Item>
                                {/* <ListGroup.Item> Product: {product.price}</ListGroup.Item> */}
                                <ListGroup.Item> Description: {product.description}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col lg={6} sm={12}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price</Col>
                                            <Col>{product.price}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status</Col>
                                            <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of stock'}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 1 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>QTY</Col>
                                                <Col>
                                                    <Form.Control 
                                                        as='select' 
                                                        value={qty} 
                                                        onChange={(e) => setQty(e.target.value)} >
                                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                            ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        {/* <Button
                                            onClick={addToCartHandler} 
                                            className="btn btn-block" 
                                            type="button" 
                                            disabled={product.countInStock === 0}>
                                            Add to cart
                                        </Button> */}
                                        <Button
                                            onClick={addToCartHandler} 
                                            className="btn btn-block" 
                                            type="button" 
                                            disabled={product.countInStock === 0}>
                                            Add to cart
                                        </Button>

                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className='my-3'>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && <Message>No Reviews. Be the first one to add a review!</Message>}
                            <ListGroup variant="flush">
                                {product.reviews.map(r => (
                                    <ListGroup.Item key={r._id}>
                                        <stron>{r.name}</stron>
                                        <Rating value={r.rating} />
                                        <p>{r.createdAt.substring(0,10)}</p>
                                        <p>{r.comment}</p>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <ListGroup.Item>
                                <h2>Leave a review</h2>
                                {errorReview && <Message variant='danger'>{errorReview}</Message>}
                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId="rating">
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control 
                                                as='select' 
                                                value={rating} 
                                                onChange={(e) => setRating(e.target.value)}>
                                                <option value=''>Select</option>
                                                <option value='1'>1 - Poor</option>
                                                <option value='2'>2 - Fair</option>
                                                <option value='3'>3 - Good</option>
                                                <option value='4'>4 - Very Good</option>
                                                <option value='5'>5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="comment">
                                            <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    row='3'
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}>

                                                </Form.Control>
                                            </Form.Group>
                                        <Button type="submit" variant="primary">Add Review</Button>
                                    </Form>) : <Message>Please <Link to='/login'>Sign Up</Link> first </Message>}
                            </ListGroup.Item>
                        </Col>
                    </Row>
                </>
                )}
        </>
        )
}

export default ProductScreen;