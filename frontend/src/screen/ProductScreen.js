import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import {Col,Row,Image,ListGroup,Card,Button} from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';


const ProductScreen = () => {
    const {id} = useParams();

    const [product, setProduct] = useState({})
    useEffect(() => {
        const fetchProduct = async() => {
            const {data} = await axios.get(`/api/products/${id}`)
            setProduct(data)
        }
        fetchProduct()
    },[])

    return (
        <>
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
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
                            <ListGroup.Item>
                                <Button 
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
        
        </>)

    
}

export default ProductScreen;