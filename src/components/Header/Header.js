import React, { useState } from 'react';
import logo from '../../images/logo.png'
import './Header.css'
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useRef } from 'react';
import { useEffect } from 'react';

const usePrevious = value => {
    const prev = useRef();
    useEffect(() => {
        console.log(value);
        
        prev.current = value;
    })

    return prev.current;
}

const Header = () => {
    const user = useContext(UserContext);
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
                <a href="/login">Sign in</a>
                <span style={{color: 'white'}}>{user}</span>
            </nav>
        </div>
    );
};

export default Header;