import React, { useState } from 'react';
import logo from '../../images/logo.png'
import './Header.css'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../Login/useAuth';

const usePrevious = value => {
    const prev = useRef();
    useEffect(() => {
        // console.log(value);
        prev.current = value;
    })

    return prev.current;
}

const Header = () => {
    // const user = useContext(UserContext);
    const auth = useAuth();
    // console.log(auth);   
    
    const [count, setCount] = useState(0);
    const previous = usePrevious(count);
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <h1>Count: {count} | Previous: {previous}</h1>
            <button onClick={() => setCount(count - 1)}>-</button>
            <button onClick={() => setCount(count + 1)}>+</button>
            <br/>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/inventory">Manage Inventory</a>
                {
                    auth.user && <span style={{color: 'yellow', marginRight: '50px'}}>{auth.user.name}</span>
                }
                {
                    auth.user ? <a href="/login">Sign out</a>
                    : <a href="/login">Sign in</a>
                }
            </nav>
        </div>
    );
};

export default Header;