import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from 'react';
import { useEffect } from 'react';

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();

export const AuthProvider = (props) =>{
    const auth = Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

/** both are same */

// export const useAuth = () => {
//     return useContext(AuthContext);
// }

export const useAuth = () => useContext(AuthContext);

/** both are same */

const getUser = user => {
    const {displayName, email, photoURL} = user;
    return {name: displayName, email, photo: photoURL};
}

const Auth = () => {

    const [user, setUser] = useState(null);

    const signInWithGoogle = () => {

        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then(res => {
                // console.log(res);   
                
                const signedInUser = getUser(res.user);
                setUser(signedInUser);

                return res.user;            
            })
            .catch(err => {
                // console.log(err);
                setUser(null);
                return err.message;
            })
    }

    const signOut = () => {
        firebase.auth().signOut().then(function() {
            setUser(null);
          }).catch(function(error) {
            console.log(error);
          });
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                const currentUser = getUser(user);
                setUser(currentUser);
                console.log(currentUser);
                
            } else {
              // No user is signed in.
            }
          });
    }, [])

    return {
        user,
        signInWithGoogle,
        signOut
    }
}

export default Auth;