import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import {Carousel, Image} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import {listTopProducts} from '../actions/productAction.js'

const ProductCarrousel = () => {
    const dispatch = useDispatch()
    const productTop = useSelector(state => state.productTop)
    const {loading, error, products} = productTop

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
            : (
                <Carousel 
                    pause='hover' 
                    className='bg-dark'>
                    {products.map(p => (
                        <Carousel.Item key={p._id}>
                            <Link to={`/product/${p._id}`}>
                                <Image src={p.image} alt={p.name} fluid />
                                <Carousel.Caption
                                    className='carousel-caption'>
                                        <h2>{p.name} (${p.price})</h2>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}

                </Carousel>
            )

}

export default ProductCarrousel