import React, { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {

    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const auth = useAuth();


    const handlePlaceOrder = () =>{
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    const removeProduct = (productKey) => {
        console.log('remove clicked', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    
    useEffect( () => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map( key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        // console.log(cartProducts);
        setCart(cartProducts);
    }, []);
    
    let thankyou;
    if(orderPlaced){
        thankyou = <img src={happyImage} alt=""/>
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map( 
                        pd => <ReviewItem 
                                            key = {pd.key}
                                            removeProduct = {removeProduct}
                                            product={pd}>
                                    </ReviewItem>)
                }
                <br/>
                <span style={{textAlign: "center"}}>
                    {thankyou}
                    {
                        !cart.length && <h1>Your cart is empty. <a href="/shop">Keep Shopping</a> </h1>
                    }
                </span> 
            </div>
            <div className="cart-contianer">
                <Cart cart={cart}>
                    {
                        !cart.length ? <a href="/shop" className="main-button">Go to Shop</a> :
                        <Link to="/shipment">
                        {
                            auth.user ? <button onClick={handlePlaceOrder} className="main-button">Proceed Checkout</button>
                            : <button className="main-button">Login to Proceed</button>
                        }
                        </Link>
                    }
                    
                </Cart>
            </div>            
        </div>
    );
};

export default Review;