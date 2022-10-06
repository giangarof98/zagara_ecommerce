import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import { useNavigate } from "react-router";
import {useDispatch, useSelector} from 'react-redux'
import {Col,Row,Image,ListGroup,Card,Button,Form} from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {listProductDetails} from '../actions/productAction'

const ProductScreen = () => {
    const [qty, setQty] = useState(1)
    const {id} = useParams();
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    //console.log(params)
    const {loading, error, product} = productDetails;
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(listProductDetails(id))

    },[dispatch,id])

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }
    
    return (
        <>
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
            {loading ? (
                <Loader/>
                ) : error ?(
                <Message variant='danger'>{error}</Message>
                ) : (
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
                )}
        </>)

    
}

export default ProductScreen;