import React from 'react';
import Auth from './useAuth';

const Login = () => {
    const auth = Auth();
    // console.log(auth);
    // debugger;

    const handleSignIn = () => {
        auth.signInWithGoogle()
        .then(res => {
            // console.log("redirect");
            window.location.pathname = '/review';
        });
    }
    
    const handleSignOut = () => {
        auth.signOut()
        .then(res => {
            // console.log("redirect");
            window.location.pathname = '/';
        });
    }

    return (
        <div>
            <h1>Login Page</h1>
            {

                auth.user ? <button onClick={handleSignOut}>Sign Out</button> :
                <button onClick={handleSignIn}>Sign in with Google</button>

            }
        </div>
    );
};

export default Login;