import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    console.log(product);
    
    return (
        <div>
            <h1>Your Product Details</h1>
            <Product showAddtoCart={false} products={product}></Product>
        </div>
    );
};

export default ProductDetail;