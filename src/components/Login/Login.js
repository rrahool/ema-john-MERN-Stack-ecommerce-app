import React from 'react';
import Auth from './useAuth';

const Login = () => {
    const auth = Auth();
    // console.log(auth);
    // debugger;
    
    return (
        <div>
            <h1>Login Page</h1>
            {

                auth.user ? <button onClick={auth.signOut}>Sign Out</button> :
                <button onClick={auth.signInWithGoogle}>Sign in with Google</button>

            }
        </div>
    );
};

export default Login;