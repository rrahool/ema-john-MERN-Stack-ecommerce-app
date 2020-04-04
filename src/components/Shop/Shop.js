import React, { useState } from 'react';
import { useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {

    // console.log(fakeData);

    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    // const handleAddProduct = (product) => {
    //     // console.log('Product Added', product);
    //     const newCart = [...cart, product];
    //     setCart(newCart);
    //     const sameProduct = newCart.filter(pd => pd.key === product.key);
    //     const count = sameProduct.length
    //     addToDatabaseCart(product.key, count)        
    // }

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            const count  = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        
        addToDatabaseCart(product.key, count);        
    }

    useEffect( () => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const previousCart = productKeys.map( existingkey => {
            const product = fakeData.find(pd => pd.key === existingkey);
            product.quantity = savedCart[existingkey];
            return product;
        });
        // console.log(cartProducts);
        setCart(previousCart);
    }, []);

    return (
        <div className="twin-container">
            <div className="product-container">
                <ul>
                    {
                        products.map(
                            product => <Product 
                                            key = {product.key}
                                            showAddtoCart={true}
                                            products = {product}
                                            handleAddProduct = {handleAddProduct} 
                                        >
                                        </Product>
                        )
                    }
                </ul>
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;