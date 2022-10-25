import React from "react";
import {Helmet} from 'react-helmet';

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords}/>

        </Helmet>
    )
}

Meta.defaultProps ={
    title: 'welcome to Zagara',
    description: 'ecommerce with the best products',
    keywords: 'electronics, software, technology'
}

export default Meta