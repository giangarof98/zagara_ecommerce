import React, {useState, useEffect} from "react";
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';

import axios from 'axios';

const HomeScreen = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProduct = async() => {
            const {data} = await axios.get('/api/products')
            setProducts(data);
        }
        fetchProduct()
    }, [])
    return(
        <>
            <h1>Articles</h1>
            <Row>
                {products.map(el => (
                    <Col key={el._id} sm={12} md={6} lg={4} cl={3} >
                        <Product product={el} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen