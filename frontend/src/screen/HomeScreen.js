import React from "react";
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product';

import products from '../products'

const HomeScreen = () => {
    return(
        <>
            <h1>Articles</h1>
            <Row>
                {products.map(el => (
                    <Col sm={12} md={6} lg={4} cl={3} >
                        <Product product={el} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen