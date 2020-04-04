import React from 'react';
import { useAuth } from '../Login/useAuth';


const Cart = (props) => {
    const cart = props.cart;
    const auth = useAuth();
    console.log(auth.user);

    /* We can use reduce or for loop to retrieve the total price of products added to the cart*/
    /* USING reduce*/
    // const totalPrice = cart.reduce((total, prd) => total + prd.price, 0);
    // console.log(totalPrice);

    /**USING for loop */
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
        // debugger;

    }

    // shipping cost pending

    const tax = (total / 10).toFixed(2);

    const grandTotal = (total + Number(tax)).toFixed(2);


    return (
        <div>
            <h2>Order Summary</h2>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {total}</p>
            <p><small>Tax + VAT: {tax}</small></p>
            <p>Total Price: {grandTotal}</p>
            <br/>
            {
                props.children
            }
            <p>{}</p>
        </div>
        
    );
};

export default Cart;