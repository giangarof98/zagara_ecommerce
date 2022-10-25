import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product.js';
import Message from '../components/Message.js';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate'
import { listProducts } from "../actions/productAction";
import {useParams} from 'react-router-dom';
import ProductCarrousel from "../components/ProductCarousel.js";


const HomeScreen = () => {
    const {keyword} = useParams();

    const pageNumber = useParams().pageNumber || 1
    
    const dispatch = useDispatch();
    const productList =  useSelector(state => state.productList)
    const {loading, error, products, page, pages} = productList
    
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    
    return(
        <>
        {!keyword && <ProductCarrousel/>}
            <h1>Articles</h1>
            {loading ? (
                <Loader/> 
            ): error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map(el => (
                            <Col key={el._id} sm={12} md={6} lg={4} cl={3} >
                                <Product product={el} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
                </>
            )}
        </>
    )
}

export default HomeScreen